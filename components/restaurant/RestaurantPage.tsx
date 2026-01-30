"use client"

import { useRestaurant } from "@/hooks/useRestaurants"
import { UserHeader } from "@/components/core/UserHeader"
import { RestaurantHero } from "./RestaurantHero"
import { RestaurantInfo } from "./RestaurantInfo"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { Footer } from "../core/Footer"

type RestaurantPageProps = {
  id: string
}

export function RestaurantPage({ id }: RestaurantPageProps) {
  const { restaurant, loading, error } = useRestaurant(id)

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Cargando restaurante...</p>
      </main>
    )
  }

  if (error || !restaurant) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{error || "Restaurante no encontrado"}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <UserHeader />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6 space-y-8">
        <RestaurantHero
          name={restaurant.name} 
          address={restaurant.address}
          image={restaurant.image || restaurant.photograph || "/images/default-image.avif"} 
        />

 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RestaurantInfo restaurant={restaurant} />
          </div>
          <div className="lg:col-span-1">
            <CommentForm />
          </div>
        </div>

      
        <div className="pt-8 border-t border-gray-100">
          <CommentList reviews={restaurant.reviews} />
        </div>
      </div>

    
      <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
    </main>
  )
}
