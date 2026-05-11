import { AnimatedBackdrop } from "@/features/landing/components/animated-backdrop"
import { HeroSection } from "@/features/landing/components/hero-section"

export default function HomePage() {
  return (
    <div className="cinematic-gradient relative isolate min-h-screen overflow-hidden bg-black text-white">
      <AnimatedBackdrop />
      <div className="relative z-10">
        <HeroSection />
      </div>
    </div>
  )
}
