import type { Metadata } from "next"
import { RestaurantPage } from "@/components/restaurant"

export const metadata: Metadata = {
  title: 'Restaurant details',
  description: 'Detailed information and reviews of the restaurant',
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function RestaurantDetail({ params }: PageProps) {
  const { id } = await params;
  return <RestaurantPage id={id} />
}
