import type { Movie } from "@/types/movie"

export const mockRecommendations: Movie[] = [
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    year: 2017,
    genre: ["Sci-Fi", "Drama"],
    runtime: 164,
    rating: 8.0,
    matchScore: 96,
    synopsis:
      "A young blade runner uncovers a secret that challenges what it means to be human.",
  },
  {
    id: "arrival",
    title: "Arrival",
    year: 2016,
    genre: ["Sci-Fi", "Mystery"],
    runtime: 116,
    rating: 7.9,
    matchScore: 92,
    synopsis:
      "A linguist leads communication efforts after mysterious spacecraft appear around the world.",
  },
  {
    id: "her",
    title: "Her",
    year: 2013,
    genre: ["Romance", "Sci-Fi"],
    runtime: 126,
    rating: 8.0,
    matchScore: 88,
    synopsis:
      "A lonely writer forms an unexpected emotional bond with an AI operating system.",
  },
]
