"use client"

import type { Restaurant } from "@/domain/restaurants.type"

type RestaurantInfoProps = {
  restaurant: Restaurant
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const { neighborhood, cuisine_type, operating_hours } = restaurant

  return (
    <div className="space-y-6">
   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Barrio</h3>
          <p className="text-gray-900">{neighborhood}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Tipo de cocina</h3>
          <p className="text-gray-900">{cuisine_type}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">Horarios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(operating_hours).map(([day, hours]) => (
            <div key={day} className="flex justify-between text-sm">
              <span className="text-gray-600">{day}</span>
              <span className="text-gray-900 font-medium">{hours}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
