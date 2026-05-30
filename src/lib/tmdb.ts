const TMDB_BASE_URL = "https://api.themoviedb.org/3";

type FetchTmdbMoviesInput = {
  genreIds: number[];
  limit?: number;
};

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
};

type DiscoverMovieResponse = {
  results: TmdbMovie[];
};

export async function fetchMoviesByGenres({
  genreIds,
  limit = 8,
}: FetchTmdbMoviesInput): Promise<TmdbMovie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB_API_KEY environment variable.");
  }

  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: Math.floor(Math.random() * 3 + 1).toString(),
    sort_by: "vote_average.desc",
    "vote_count.gte": "150",
    "vote_average.gte": "6.5",
    with_genres: genreIds.join(","),
  });

  const response = await fetch(`${TMDB_BASE_URL}/discover/movie?${params}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TMDB request failed: ${errorText}`);
  }

  const data = (await response.json()) as DiscoverMovieResponse;
  return (data.results ?? []).slice(0, limit);
}
