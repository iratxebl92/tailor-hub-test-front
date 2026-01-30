
import type { Metadata } from "next"
import { HomePage } from "@/components/home/HomePage"

export const metadata: Metadata = {
  title: "Home",
  description: "Entry point of the technical challenge with an introduction and onboarding flow.",
}

export default function Home() {
  return <HomePage />
}
