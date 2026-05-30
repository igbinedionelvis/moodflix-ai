const moodToGenreMap: Record<string, number[]> = {
  "emotionally exhausted": [18, 10749],
  nostalgic: [18, 10749, 10402],
  lonely: [18, 9648],
  hopeful: [18, 35, 14],
  chaotic: [28, 53, 80],
  healing: [18, 10751],
  comfort: [35, 10751, 10749],
  adventurous: [12, 878, 14],
  heartbroken: [18, 10749],
  inspired: [12, 14, 18],
};

const fallbackGenres = [18, 10749, 35];

export function mapMoodsToGenreIds(
  selectedMoods: string[],
  inferredThemes: string[],
): number[] {
  const normalizedSelections = selectedMoods.map((mood) => mood.toLowerCase());
  const normalizedThemes = inferredThemes.map((theme) => theme.toLowerCase());

  const genreFrequency = new Map<number, number>();

  normalizedSelections.forEach((mood, index) => {
    const weight = Math.max(1, 3 - index);

    for (const genreId of moodToGenreMap[mood] ?? []) {
      genreFrequency.set(genreId, (genreFrequency.get(genreId) ?? 0) + weight);
    }
  });

  for (const theme of normalizedThemes) {
    for (const [mood, genreIds] of Object.entries(moodToGenreMap)) {
      if (!theme.includes(mood) && !mood.includes(theme)) {
        continue;
      }

      for (const genreId of genreIds) {
        genreFrequency.set(genreId, (genreFrequency.get(genreId) ?? 0) + 1);
      }
    }
  }

  if (genreFrequency.size === 0) {
    return fallbackGenres;
  }

  const finalGenres = [...genreFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genreId]) => genreId);

  return finalGenres;
}
