MoodFlix is a cinematic AI-powered movie discovery app built with Next.js.

## Getting Started

1) Install dependencies:

```bash
npm install
```

2) Configure environment variables:

```bash
cp .env.example .env.local
```

Then set these values in `.env.local`:

- `OPENAI_API_KEY` - API key for emotional analysis
- `OPENAI_MODEL` - optional model override (default: `gpt-4o-mini`)
- `TMDB_API_KEY` - API key for fetching movies from TMDB

3) Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Recommendation API

Endpoint: `POST /api/recommend`

Request body:

```json
{
  "moods": ["comfort", "healing"],
  "emotionalInput": "I had a stressful week and want something emotionally comforting."
}
```

What it does:

- analyzes emotional input via OpenAI
- extracts mood themes
- maps moods/themes to TMDB genre IDs
- fetches matching movies from TMDB
- returns:
  - emotional profile
  - recommendation explanation
  - recommendation array with emotional fit scores

Core implementation modules:

- `src/lib/openai.ts`
- `src/lib/mood-map.ts`
- `src/lib/tmdb.ts`
- `src/app/api/recommend/route.ts`

## Notes

- This backend flow is intentionally simple and portfolio-friendly.
- Recommendation ranking can be improved later with user history and embeddings.

