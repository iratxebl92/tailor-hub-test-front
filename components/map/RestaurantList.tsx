"use client"

import { useRouter } from "next/navigation"
import { useRestaurants } from "@/hooks/useRestaurants"
import { useRestaurantUIStore } from "@/store/restaurantStore"
import { RestaurantCard } from "./"
import type { Restaurant, RestaurantCardType } from "@/domain/restaurants.type"


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

  const selectedId = useRestaurantUIStore((state) => state.selectedRestaurantId)
  const setSelectedId = useRestaurantUIStore((state) => state.setSelectedRestaurantId)

  const handleRestaurantClick = (restaurantId: number) => {
    setSelectedId(restaurantId)
    router.push(`/restaurant/${restaurantId}`)
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (restaurants.length === 0 && !loading) {
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
