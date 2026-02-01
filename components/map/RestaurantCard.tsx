"use client"

import Image from "next/image"
import { useState } from "react"
import { Stars } from "../Icons/Stars"
import type { RestaurantCardType} from "@/domain/restaurants.type"

const DEFAULT_IMAGE = "/images/default-image.avif"

type RestaurantCardProps = {
  restaurant: RestaurantCardType
  isSelected?: boolean  
  onClick?: () => void  
}

export function RestaurantCard({ 
  restaurant, 
  isSelected = false, 
  onClick 
}: RestaurantCardProps) {
  const [imgSrc, setImgSrc] = useState(restaurant.image || DEFAULT_IMAGE)
  
 //Generar las estrellas de la calificación
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Stars 
        key={index} 
        index={index} 
        starNumber={index + 1} 
        rating={restaurant.rating} 
      />
    ))
  }

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl p-3 sm:p-4 shadow-sm 
        hover:shadow-md transition-all cursor-pointer
        ${isSelected ? "opacity-100" : "opacity-50"}
      `}
    >
      <div className="flex gap-3 sm:gap-4">
      
        <div className="shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={imgSrc}
              alt={restaurant.name || 'Imágen del restaurante'}
              fill
              className="object-cover"
              onError={() => setImgSrc(DEFAULT_IMAGE)}
              unoptimized={imgSrc.startsWith("http")}

            />
          </div>
        </div>

     
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-black mb-1 truncate">
            {restaurant.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
            {restaurant.address}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
            <span className="text-xs sm:text-sm text-gray-600">
              ({restaurant.commentsCount} comentarios)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
