"use client"

import { useState } from "react"
import { LandingScreen } from "@/components/home/LandingScreen"
import { OnboardingLayout } from "@/components/home/onboarding/OnboardingLayout"

export function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="h-full overflow-hidden relative">
        <div
          className={`absolute inset-0 transition-opacity duration-500 p-4 sm:p-6 md:p-8 ${
            showOnboarding
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <LandingScreen onEnter={() => setShowOnboarding(true)} />
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 p-4 sm:p-6 md:p-8 ${
            showOnboarding
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <OnboardingLayout />
        </div>
      </div>

      <footer className="pb-2 pl-4 sm:pl-6 md:pl-8">
        <p className="text-xs text-footer-color">
          Prueba técnica © Tailor hub SL 2019 – 2026
        </p>
      </footer>
    </main>
  )
}
