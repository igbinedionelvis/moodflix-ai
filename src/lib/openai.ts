import type { EmotionalProfile } from "@/types/recommendation"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini"

type AnalyzeEmotionInput = {
  emotionalInput: string
  selectedMoods: string[]
}

function extractJson(text: string): string {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)\s*```/i)
  if (fencedMatch?.[1]) {
    return fencedMatch[1]
  }
  return text
}

export async function analyzeEmotionalProfile({
  emotionalInput,
  selectedMoods,
}: AnalyzeEmotionInput): Promise<EmotionalProfile> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.")
  }

  const model = process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are an emotional media analyst. Return strictly valid JSON only.",
        },
        {
          role: "user",
          content: `Analyze this emotional state and extract concise themes for movie recommendations.

Selected moods: ${selectedMoods.join(", ")}
User text: ${emotionalInput}

Return JSON with this exact shape:
{
  "primaryMood": "string",
  "tone": "string",
  "themes": ["string", "string", "string"]
}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI request failed: ${errorText}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const rawContent = data.choices?.[0]?.message?.content?.trim()
  if (!rawContent) {
    throw new Error("OpenAI returned empty analysis content.")
  }

  const parsed = JSON.parse(extractJson(rawContent)) as EmotionalProfile

  return {
    primaryMood: parsed.primaryMood ?? selectedMoods[0] ?? "reflective",
    tone: parsed.tone ?? "emotionally nuanced",
    themes: Array.isArray(parsed.themes) ? parsed.themes.slice(0, 5) : [],
  }
}
