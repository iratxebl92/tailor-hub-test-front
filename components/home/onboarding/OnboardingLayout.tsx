'use client'

import { TwoColumnSection } from "../../layouts/TwoColumnSection"
import { OnboardingMessage } from "./OnboardingMessage"
export const OnboardingLayout = () => {
  return (
    <TwoColumnSection
      leftContent={<OnboardingMessage />}
      rightImageSrc="/images/onboarding-image.avif"
      rightImageAlt="Restaurante acogedor"
    />
  )
}

