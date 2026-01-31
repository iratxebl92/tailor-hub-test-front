"use client"

import { UserHeader } from "@/components/core/UserHeader"
import { MapContainer } from "./MapContainer"
import { RestaurantList } from "./RestaurantList"
import { Footer } from "../core/Footer"
import { useRestaurants } from "@/hooks/useRestaurants"
import { LoadingSpinner } from "../core/LoadingSpinner"

export function MapPage() {
  const {  loading } = useRestaurants()
  if (loading) {
    return (
      <LoadingSpinner />
    )
  }
  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden">
   
      <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8">
        <UserHeader />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 min-h-0 overflow-hidden">
        
        <div className="flex flex-col flex-1 lg:flex-[1.2] min-h-0">
          <MapContainer />
        
          <Footer
          className="pt-2"
          />
        </div>

        <div className="flex-1 lg:flex-[0.8] min-h-0">
          <RestaurantList />
        </div>
      </div>
    </main>
  )
}
