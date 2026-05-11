"use client"

import { motion } from "framer-motion"
import { Film, Heart, Sparkles } from "lucide-react"

export function RecommendationResultsPlaceholder() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl sm:p-8"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-100/85">
        <Sparkles className="size-3.5" />
        Recommendation Reveal
      </div>

      <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        Your emotionally aligned lineup is ready.
      </h3>
      <p className="mt-3 max-w-2xl text-white/70">
        MoodFlix has translated your emotional context into a cinematic profile.
        Recommendation cards will appear here in the next integration step.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/15 bg-slate-950/40 p-4 text-white/80">
          <Heart className="mb-2 size-4 text-pink-200" />
          Emotional fit score
        </div>
        <div className="rounded-2xl border border-white/15 bg-slate-950/40 p-4 text-white/80">
          <Film className="mb-2 size-4 text-cyan-200" />
          Recommended films
        </div>
        <div className="rounded-2xl border border-white/15 bg-slate-950/40 p-4 text-white/80">
          <Sparkles className="mb-2 size-4 text-fuchsia-200" />
          Why this matches tonight
        </div>
      </div>
    </motion.section>
  )
}
