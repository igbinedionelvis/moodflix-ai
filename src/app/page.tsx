import { WandSparkles } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecommendationCard } from "@/features/recommendations/components/recommendation-card";
import { mockRecommendations } from "@/features/recommendations/data/mock-movies";

export default function HomePage() {
  return (
    <AppShell>
      <section className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <Badge variant="outline" className="w-fit gap-1.5">
          <WandSparkles className="size-3.5" />
          AI Recommendation Engine
        </Badge>
        <div className="space-y-3">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Discover your next favorite film with MoodFlix
          </h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            Built for rapid experimentation with ranking models, user preference
            signals, and personalized recommendation flows.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button>Start onboarding</Button>
          <Button variant="outline">Import watch history</Button>
        </div>
      </section>

      <section id="recommendations" className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Top picks for tonight
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockRecommendations.map((movie) => (
            <RecommendationCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
