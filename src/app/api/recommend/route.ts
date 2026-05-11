import { NextResponse } from "next/server"

import { mapMoodsToGenreIds } from "@/lib/mood-map"
import { analyzeEmotionalProfile } from "@/lib/openai"
import { fetchMoviesByGenres } from "@/lib/tmdb"
import type {
  EmotionalProfile,
  MovieRecommendation,
  RecommendRequest,
  RecommendResponse,
} from "@/types/recommendation"

export async function GET() {
  return NextResponse.json(
    { success: true, message: "Recommend API is reachable." },
    { status: 200 }
  )
}

function fallbackProfile(moods: string[], emotionalInput: string): EmotionalProfile {
  const normalized = emotionalInput.toLowerCase()
  const themes: string[] = []

  if (normalized.includes("stress")) themes.push("emotional release")
  if (normalized.includes("comfort")) themes.push("comfort seeking")
  if (normalized.includes("alone")) themes.push("connection")
  if (normalized.includes("hope")) themes.push("optimism")

  return {
    primaryMood: moods[0] ?? "reflective",
    tone: "emotionally layered",
    themes: themes.length > 0 ? themes : moods.slice(0, 3),
  }
}

function buildFitScore(
  movieId: number,
  voteAverage: number,
  selectedMoodCount: number,
  themeCount: number
): number {
  const base = 62 + Math.round(voteAverage * 3.2) + selectedMoodCount * 3 + themeCount * 2
  const deterministicVariance = movieId % 9
  return Math.max(55, Math.min(98, base + deterministicVariance))
}

function buildRecommendationReason(
  movieTitle: string,
  profile: EmotionalProfile
): string {
  const themesText = profile.themes.slice(0, 2).join(" + ")
  return `${movieTitle} aligns with your ${profile.tone} tone and themes like ${themesText || profile.primaryMood}.`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RecommendRequest>
    const moods = Array.isArray(body.moods) ? body.moods.filter(Boolean) : []
    const emotionalInput = body.emotionalInput?.trim() ?? ""

    if (moods.length === 0 || emotionalInput.length < 8) {
      return NextResponse.json(
        { error: "Please provide mood selections and a meaningful emotional input." },
        { status: 400 }
      )
    }

    let profile: EmotionalProfile
    try {
      profile = await analyzeEmotionalProfile({
        emotionalInput,
        selectedMoods: moods,
      })
    } catch {
      // Keep the endpoint resilient if OpenAI fails temporarily.
      profile = fallbackProfile(moods, emotionalInput)
    }

    const genreIds = mapMoodsToGenreIds(moods, profile.themes)
    const movies = await fetchMoviesByGenres({ genreIds, limit: 8 })

    const recommendations: MovieRecommendation[] = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      rating: movie.vote_average,
      emotionalFitScore: buildFitScore(
        movie.id,
        movie.vote_average,
        moods.length,
        profile.themes.length
      ),
      recommendationReason: buildRecommendationReason(movie.title, profile),
    }))

    const response: RecommendResponse = {
      emotionalProfile: profile,
      explanation: `Based on your ${profile.primaryMood} mood and ${profile.tone} tone, we prioritized films that match ${profile.themes.join(", ") || "your emotional context"}.`,
      recommendations,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected recommendation error."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
