"use client"

import { useState } from "react"
import { LandingScreen } from "@/components/home/LandingScreen"
import { OnboardingLayout } from "@/components/home/onboarding/OnboardingLayout"
import { Footer } from "../core/Footer"

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

     <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
    </main>
  )
}
