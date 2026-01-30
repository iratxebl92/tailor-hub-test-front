import type { Metadata } from "next"
import { MapPage } from "@/components/map/MapPage"

export const metadata: Metadata = {
  title: 'Map Page',
  description: 'Interactive map with favorite restaurants',
}

export default function Map() {
  return <MapPage />
}
