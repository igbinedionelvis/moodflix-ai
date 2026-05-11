"use client"

import { motion } from "framer-motion"
import { Loader2, Send } from "lucide-react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CHARACTER_LIMIT = 220

type AiMoodInputSectionProps = {
  selectedMoodCount: number
  isAnalyzing: boolean
  onSubmitMood: (input: string) => Promise<void>
}

export function AiMoodInputSection({
  selectedMoodCount,
  isAnalyzing,
  onSubmitMood,
}: AiMoodInputSectionProps) {
  const [moodInput, setMoodInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const remainingChars = CHARACTER_LIMIT - moodInput.length
  const hasMoodInput = moodInput.trim().length > 0
  const canSubmit = selectedMoodCount > 0 && hasMoodInput && !isAnalyzing

  const helperText = useMemo(() => {
    if (selectedMoodCount === 0) {
      return "Select at least one mood chip to unlock AI recommendations."
    }
    if (!hasMoodInput) {
      return "Describe your emotional state for richer recommendations."
    }
    if (isAnalyzing) {
      return "Analyzing emotional context..."
    }
    return "Ready to discover your cinematic mood match."
  }, [selectedMoodCount, hasMoodInput, isAnalyzing])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) {
      return
    }

    await onSubmitMood(moodInput.trim())
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42, duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mt-6 space-y-3"
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 0 1px rgba(244,114,182,0.7), 0 0 40px rgba(192,132,252,0.25)"
            : "0 0 0 1px rgba(255,255,255,0.14), 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl"
      >
        <textarea
          value={moodInput}
          onChange={(event) =>
            setMoodInput(event.target.value.slice(0, CHARACTER_LIMIT))
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="I had a stressful week and want something emotionally comforting."
          rows={4}
          className="w-full resize-none bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none sm:text-base"
        />
      </motion.div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <p className="text-white/60">{helperText}</p>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[11px] text-white/75 sm:text-xs",
              remainingChars <= 20
                ? "border-pink-300/40 bg-pink-300/10 text-pink-100"
                : "border-white/20 bg-white/8"
            )}
          >
            {moodInput.length}/{CHARACTER_LIMIT}
          </span>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit}
          className="h-11 rounded-full bg-white text-black transition-all duration-300 hover:bg-white/90 disabled:bg-white/30 disabled:text-white/60"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Reading your mood...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Generate recommendations
            </>
          )}
        </Button>
      </div>
    </motion.form>
  )
}
