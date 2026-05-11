import { AppHeader } from "@/components/layout/app-header"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  )
}
