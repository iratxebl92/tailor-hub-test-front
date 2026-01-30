"use client"

import { useRouter } from "next/navigation"
import { useRestaurants } from "@/hooks/useRestaurants"
import { useRestaurantStore } from "@/store/store"
import { RestaurantCard } from "./RestaurantCard"
import type { Restaurant, RestaurantCard as RestaurantCardType } from "@/domain/types"

// Calcula el promedio de las calificaciones de un restaurante
function calculateAverageRating(reviews: Restaurant["reviews"]): number {
  if (!reviews || reviews.length === 0) return 0
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return Math.round(total / reviews.length)
}

// Transforma los datos del restaurante al formato que necesita la card
function toCardFormat(restaurant: Restaurant): RestaurantCardType {
  return {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    image: restaurant.image || restaurant.photograph,
    rating: calculateAverageRating(restaurant.reviews),
    commentsCount: restaurant.reviews?.length || 0,
  }
}


export function RestaurantList() {
  const router = useRouter()
  
  const { restaurants, loading, error } = useRestaurants()

  const selectedId = useRestaurantStore((state) => state.selectedRestaurantId)
  const setSelectedId = useRestaurantStore((state) => state.setSelectedRestaurantId)

  const handleRestaurantClick = (restaurantId: number) => {
    setSelectedId(restaurantId)
    router.push(`/restaurant/${restaurantId}`)
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Cargando restaurantes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (restaurants.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No hay restaurantes disponibles</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-3 sm:gap-4">
        {restaurants.map((restaurant) => {
          const isSelected = restaurant.id === selectedId

          return (
            <RestaurantCard
              key={restaurant.id}
              restaurant={toCardFormat(restaurant)}
              isSelected={isSelected}
              onClick={() => handleRestaurantClick(restaurant.id)} 
            />
          )
        })}
      </div>
    </div>
  )
}
