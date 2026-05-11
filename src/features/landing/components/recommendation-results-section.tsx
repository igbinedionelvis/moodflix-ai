"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Film, Sparkles, Star } from "lucide-react"

import type { RecommendResponse } from "@/types/recommendation"

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

type RecommendationResultsSectionProps = {
  data: RecommendResponse | null
  error: string | null
}

export function RecommendationResultsSection({
  data,
  error,
}: RecommendationResultsSectionProps) {
  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 rounded-3xl border border-rose-300/30 bg-rose-200/10 p-5 backdrop-blur-2xl sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-100/80">
          Recommendation Error
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          We hit a temporary signal mismatch.
        </h3>
        <p className="mt-3 text-white/75">{error}</p>
      </motion.section>
    )
  }

  if (!data) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl sm:p-8"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-fuchsia-100/85">
        <Sparkles className="size-3.5" />
        Recommendation Reveal
      </div>
      <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        Your emotionally aligned lineup is ready.
      </h3>
      <p className="mt-3 max-w-3xl text-white/70">{data.explanation}</p>

      <div className="mt-4 rounded-2xl border border-white/15 bg-slate-950/35 p-4">
        <p className="text-sm text-white/70">
          <span className="font-medium text-white">AI read:</span>{" "}
          {data.emotionalProfile.primaryMood} · {data.emotionalProfile.tone}
        </p>
      </div>

      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.recommendations.map((movie) => {
          const releaseYear = movie.releaseDate?.slice(0, 4) || "N/A"
          const posterUrl = movie.posterPath
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
            : null

          return (
            <motion.article
              key={movie.id}
              variants={cardItemVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-slate-950/45 shadow-lg shadow-black/30"
            >
              <div className="relative aspect-2/3 w-full overflow-hidden">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-900/70 text-white/60">
                    <Film className="size-8" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 to-transparent" />
              </div>

              <div className="space-y-3 p-4">
                <div>
                  <h4 className="line-clamp-1 text-lg font-semibold text-white">
                    {movie.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-3 text-sm text-white/70">
                    <span>{releaseYear}</span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-300 text-amber-300" />
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-2 text-sm text-fuchsia-100">
                  Emotional fit score: {movie.emotionalFitScore}%
                </div>

                <p className="line-clamp-3 text-sm text-white/75">
                  {movie.recommendationReason}
                </p>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </motion.section>
  )
}
