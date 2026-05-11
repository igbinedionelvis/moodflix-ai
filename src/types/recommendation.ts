export type RecommendRequest = {
  moods: string[]
  emotionalInput: string
}

export type EmotionalProfile = {
  primaryMood: string
  tone: string
  themes: string[]
}

export type MovieRecommendation = {
  id: number
  title: string
  overview: string
  releaseDate: string
  posterPath: string | null
  backdropPath: string | null
  rating: number
  emotionalFitScore: number
  recommendationReason: string
}

export type RecommendResponse = {
  emotionalProfile: EmotionalProfile
  explanation: string
  recommendations: MovieRecommendation[]
}
