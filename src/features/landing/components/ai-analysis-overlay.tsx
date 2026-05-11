"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const analysisMessages = [
  "Analyzing emotional tone...",
  "Understanding your cinematic energy...",
  "Matching emotional resonance...",
  "Curating films for tonight...",
  "Finding emotionally aligned stories...",
]

type AiAnalysisOverlayProps = {
  isVisible: boolean
}

export function AiAnalysisOverlay({ isVisible }: AiAnalysisOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0)
      return
    }

    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % analysisMessages.length)
    }, 1350)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/8 p-6 text-center shadow-2xl shadow-fuchsia-950/40 backdrop-blur-2xl sm:p-8"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-fuchsia-200/40 bg-fuchsia-300/15">
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="size-6 text-fuchsia-100" />
              </motion.div>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
              MoodFlix AI Analysis
            </p>

            <div className="mt-4 min-h-14">
              <AnimatePresence mode="wait">
                <motion.p
                  key={analysisMessages[messageIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-balance text-lg text-white/90 sm:text-xl"
                >
                  {analysisMessages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mx-auto mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-fuchsia-300 via-violet-200 to-cyan-200"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
