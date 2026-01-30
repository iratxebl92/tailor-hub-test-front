import type { Metadata } from "next"
import { NewRestaurantPage } from "@/components/restaurant/new/NewRestaurantPage"

export const metadata: Metadata = {
  title: 'New restaurant',
  description: 'Add a new restaurant to your favorite list',
}

export default function NewRestaurant() {
  return <NewRestaurantPage />
}
