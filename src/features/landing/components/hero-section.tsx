"use client"

import { motion } from "framer-motion"
import { Sparkles, WandSparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MoodChips } from "@/features/landing/components/mood-chips"

export function HeroSection() {
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
            <MoodChips />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="h-11 rounded-full bg-white text-black hover:bg-white/90"
            >
              <WandSparkles className="size-4" />
              Discover My Mood Match
            </Button>
            <p className="text-sm text-white/60">
              Personalized in under 30 seconds.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
