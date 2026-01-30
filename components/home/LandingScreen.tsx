'use client'

import { Logo } from "../Icons/Logo"

type LandingScreenProps = {
  onEnter: () => void
}

export const LandingScreen = ({ onEnter }: LandingScreenProps) => {
  return (
    <div
      className="bg-primary-bg rounded-xl h-full w-full flex flex-col items-center justify-center cursor-pointer min-h-0"
      onClick={onEnter}
      role="button"
      aria-label="Go next screen"
    >
      <Logo className="w-40 h-auto object-contain" />
    </div>
  )
}