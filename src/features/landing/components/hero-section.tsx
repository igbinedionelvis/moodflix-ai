"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useMemo, useState } from "react"

import { AiAnalysisOverlay } from "@/features/landing/components/ai-analysis-overlay"
import { AiMoodInputSection } from "@/features/landing/components/ai-mood-input-section"
import { MoodChips } from "@/features/landing/components/mood-chips"
import { RecommendationResultsSection } from "@/features/landing/components/recommendation-results-section"
import type { RecommendResponse } from "@/types/recommendation"

export function HeroSection() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendationData, setRecommendationData] =
    useState<RecommendResponse | null>(null)
  const [recommendationError, setRecommendationError] = useState<string | null>(
    null
  )

  const selectedCount = selectedMoods.length
  const hasSelectedMoods = selectedCount > 0

  const helperText = useMemo(() => {
    if (!hasSelectedMoods) {
      return "Select one or more moods to continue."
    }
    return `${selectedCount} mood${selectedCount > 1 ? "s" : ""} selected`
  }, [hasSelectedMoods, selectedCount])

  const toggleMood = (mood: string) => {
    if (isAnalyzing) {
      return
    }
    setSelectedMoods((current) =>
      current.includes(mood)
        ? current.filter((item) => item !== mood)
        : [...current, mood]
    )
  }

  const handleMoodSubmit = async (emotionalInput: string) => {
    setRecommendationData(null)
    setRecommendationError(null)
    setIsAnalyzing(true)

    const minimumCinematicDelay = new Promise((resolve) =>
      setTimeout(resolve, 3200)
    )

    try {
      const request = fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moods: selectedMoods,
          emotionalInput,
        }),
      })

      const [response] = await Promise.all([request, minimumCinematicDelay])

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null
        throw new Error(
          errorBody?.error ??
            "Unable to generate recommendations right now. Please try again."
        )
      }

      const data = (await response.json()) as RecommendResponse
      setRecommendationData(data)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unexpected recommendation error."
      setRecommendationError(message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section className="relative flex min-h-screen items-center px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-fuchsia-950/20 backdrop-blur-2xl sm:p-10"
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <Sparkles className="size-3.5" />
              MoodFlix
            </div>
            <div className="text-xs text-white/55 sm:text-sm">
              AI emotional discovery
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Find the film that feels exactly like tonight.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="mt-5 max-w-2xl text-pretty text-base text-white/75 sm:text-lg"
          >
            MoodFlix understands your emotional state and curates cinematic
            recommendations that match your energy, your story, and your moment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="mt-8"
          >
            <MoodChips selectedMoods={selectedMoods} onToggle={toggleMood} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="mt-8"
          >
            <p className="text-sm text-white/60">
              {helperText}
            </p>
            <AiMoodInputSection
              selectedMoodCount={selectedCount}
              isAnalyzing={isAnalyzing}
              onSubmitMood={handleMoodSubmit}
            />
          </motion.div>

          <AnimatePresence>
            {!isAnalyzing &&
            (recommendationData !== null || recommendationError !== null) ? (
              <RecommendationResultsSection
                data={recommendationData}
                error={recommendationError}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
      <AiAnalysisOverlay isVisible={isAnalyzing} />
    </section>
  )
}
