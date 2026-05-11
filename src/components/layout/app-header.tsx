import Link from "next/link"
import { Clapperboard } from "lucide-react"

import { ThemeToggle } from "@/components/theme/theme-toggle"
import { navigationItems } from "@/lib/constants/navigation"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Clapperboard className="size-5 text-primary" />
          MoodFlix
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
