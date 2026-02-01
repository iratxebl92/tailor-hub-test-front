"use client"

import { useRouter } from "next/navigation"
import { useDeleteRestaurant, useRestaurant, useAddReview } from "@/hooks/useRestaurants"
import { useUserStore } from "@/store/userStore"
import { UserHeader } from "@/components/core/UserHeader"
import { RestaurantHero } from "./RestaurantHero"
import { RestaurantInfo } from "./RestaurantInfo"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { Footer } from "../core/Footer"
import { LoadingSpinner } from "../core/LoadingSpinner"

type RestaurantPageProps = {
  id: string
}

export function RestaurantPage({ id }: RestaurantPageProps) {
  const router = useRouter()
  const { restaurant, loading, error, refetch } = useRestaurant(id)
  const { deleteRestaurant } = useDeleteRestaurant()
  const { addReview, loading: addingReview } = useAddReview()
  const user = useUserStore(state => state.user)

  if (loading) {
   return <LoadingSpinner />
  }

  if (error || !restaurant) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{error || "Restaurante no encontrado"}</p>
      </main>
    )
  }

  const handleDeleteRestaurant = async (id: string) => {
    try {
      deleteRestaurant(id)
      router.push("/map")
    } catch (error) {
      console.error("Error al eliminar el restaurante", error)
    }
  }

  const handleReviewAdded = async (review: { name: string; rating: number; comments: string }) => {
    const result = await addReview(id, review)
    if (result) {
      // Refrescar los datos del restaurante para mostrar el nuevo comentario
      refetch()
    }
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
            <CommentForm 
              restaurantId={id}
              userName={user?.username || "Anónimo"}
              onReviewAdded={handleReviewAdded}
              isSubmitting={addingReview}
            />
          </div>
        </div>

      
        <div className="pt-8 border-t border-gray-100">
          <CommentList reviews={restaurant.reviews} />
        </div>
    <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 flex gap-4 justify-center">
      <button
        onClick={() => router.push("/map")}
        className="px-6 py-2 bg-black text-white border border-black rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all transform active:scale-95 shadow-sm hover:cursor-pointer"
      >
        Volver al mapa
      </button>
      <button
        onClick={() => router.push(`/restaurant/${id}/edit`)}
        className="px-6 py-2 bg-white border border-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition-all transform active:scale-95 shadow-sm hover:cursor-pointer"
      >
        Editar Restaurante
      </button>
      <button
        className="px-6 py-2 bg-white border border-red-500 text-red-500 rounded-full text-sm font-bold hover:bg-red-500 hover:text-white transition-all transform active:scale-95 shadow-sm hover:cursor-pointer"
        onClick={() => handleDeleteRestaurant(id)}
      >
        Eliminar Restaurante
      </button>
    </div>
      </div>

      <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
    </main>
  )
}
