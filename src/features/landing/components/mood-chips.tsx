"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { moodChips } from "@/features/landing/data/moods"
import { cn } from "@/lib/utils"

type MoodChipsProps = {
  selectedMoods: string[]
  onToggle: (mood: string) => void
}

export function MoodChips({ selectedMoods, onToggle }: MoodChipsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {moodChips.map((mood, index) => (
        <motion.button
          type="button"
          key={mood}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + index * 0.06, duration: 0.35 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onToggle(mood)}
          className={cn(
            "group relative overflow-hidden rounded-full border px-3.5 py-1.5 text-left text-xs font-medium capitalize text-white/90 backdrop-blur-lg transition-all duration-300 sm:text-sm",
            "border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15",
            selectedMoods.includes(mood) &&
              "border-fuchsia-300/70 bg-fuchsia-400/20 text-white shadow-[0_0_25px_rgba(217,70,239,0.45)]"
          )}
        >
          <span className="relative z-10 inline-flex items-center gap-1.5">
            {selectedMoods.includes(mood) ? (
              <Check className="size-3.5 text-fuchsia-100" />
            ) : null}
            {mood}
          </span>
          {selectedMoods.includes(mood) ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-linear-to-r from-fuchsia-400/20 via-violet-300/10 to-cyan-300/20"
            />
          ) : null}
        </motion.button>
      ))}
    </div>
  )
}
