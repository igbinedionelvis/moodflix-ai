"use client"

import { motion } from "framer-motion"
import { Sparkles, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Movie } from "@/types/movie"

export function RecommendationCard({ movie }: { movie: Movie }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="h-full">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg">
              {movie.title} ({movie.year})
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="size-3.5" />
              {movie.matchScore}% match
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-current text-amber-400" />
              {movie.rating}
            </span>
            <span>{movie.runtime}m</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{movie.synopsis}</p>
          <div className="flex flex-wrap gap-2">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  )
}
