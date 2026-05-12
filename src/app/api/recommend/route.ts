import { NextResponse } from "next/server";

import { mapMoodsToGenreIds } from "@/lib/mood-map";
import { analyzeEmotionalProfile } from "@/lib/openai";
import { fetchMoviesByGenres } from "@/lib/tmdb";
import type {
  EmotionalProfile,
  MovieRecommendation,
  RecommendRequest,
  RecommendResponse,
} from "@/types/recommendation";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

type TmdbPopularMovie = {
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type TmdbPopularResponse = {
  results: TmdbPopularMovie[];
};

export async function GET() {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (!tmdbApiKey) {
      return NextResponse.json(
        { error: "Missing TMDB_API_KEY environment variable." },
        { status: 500 },
      );
    }
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tmdbApiKey}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `TMDB popular movies request failed: ${errorText}` },
        { status: response.status },
      );
    }

    const data = (await response.json()) as TmdbPopularResponse;
    const movies = (data.results ?? []).slice(0, 10).map((movie) => ({
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));

    return NextResponse.json({ success: true, movies }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected TMDB integration error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function fallbackProfile(
  moods: string[],
  emotionalInput: string,
): EmotionalProfile {
  const normalized = emotionalInput.toLowerCase();
  const themes: string[] = [];

  if (normalized.includes("stress")) themes.push("emotional release");
  if (normalized.includes("comfort")) themes.push("comfort seeking");
  if (normalized.includes("alone")) themes.push("connection");
  if (normalized.includes("hope")) themes.push("optimism");

  return {
    primaryMood: moods[0] ?? "reflective",
    tone: "emotionally layered",
    themes: themes.length > 0 ? themes : moods.slice(0, 3),
  };
}

function buildFitScore(
  movieId: number,
  voteAverage: number,
  selectedMoodCount: number,
  themeCount: number,
): number {
  const base =
    62 + Math.round(voteAverage * 3.2) + selectedMoodCount * 3 + themeCount * 2;
  const deterministicVariance = movieId % 9;
  return Math.max(55, Math.min(98, base + deterministicVariance));
}

function buildRecommendationReason(
  movieTitle: string,
  profile: EmotionalProfile,
): string {
  const themesText = profile.themes.slice(0, 2).join(" + ");
  return `${movieTitle} aligns with your ${profile.tone} tone and themes like ${themesText || profile.primaryMood}.`;
}

export async function POST(request: Request) {
  try {
    console.log("POST ROUTE HIT");

    const body = (await request.json()) as Partial<RecommendRequest>;
    console.log("BODY:", body);

    const moods = Array.isArray(body.moods) ? body.moods.filter(Boolean) : [];
    const emotionalInput = body.emotionalInput?.trim() ?? "";
    console.log("MOODS:", moods);
    console.log("INPUT:", emotionalInput);

    if (moods.length === 0 || emotionalInput.length < 8) {
      return NextResponse.json(
        {
          error:
            "Please provide mood selections and a meaningful emotional input.",
        },
        { status: 400 },
      );
    }

    let profile: EmotionalProfile;
    try {
      profile = await analyzeEmotionalProfile({
        emotionalInput,
        selectedMoods: moods,
      });
    } catch (error) {
      console.error("POST ROUTE ERROR:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Unexpected recommendation error.";

      return NextResponse.json({ error: message }, { status: 500 });
    }

    const genreIds = mapMoodsToGenreIds(moods, profile.themes);
    const movies = await fetchMoviesByGenres({ genreIds, limit: 8 });

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
        profile.themes.length,
      ),
      recommendationReason: buildRecommendationReason(movie.title, profile),
    }));

    const response: RecommendResponse = {
      emotionalProfile: profile,
      explanation: `Based on your ${profile.primaryMood} mood and ${profile.tone} tone, we prioritized films that match ${profile.themes.join(", ") || "your emotional context"}.`,
      recommendations,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected recommendation error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
