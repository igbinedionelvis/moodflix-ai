"use client"

import { motion } from "framer-motion"

import { moodChips } from "@/features/landing/data/moods"

export function MoodChips() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {moodChips.map((mood, index) => (
        <motion.span
          key={mood}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + index * 0.06, duration: 0.35 }}
          className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-lg sm:text-sm"
        >
          {mood}
        </motion.span>
      ))}
    </div>
  )
}
