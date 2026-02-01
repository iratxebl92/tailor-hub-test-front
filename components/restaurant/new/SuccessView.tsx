"use client"

import { useRouter } from "next/navigation"
import { useNewRestaurant } from "./hook/useNewRestaurant"
import { CheckIcon } from "@/components/Icons/CheckIcon"

export function SuccessView() {
    const router = useRouter()
    const { errorMessage, createdRestaurantId } = useNewRestaurant()

    return (
        <div className="flex flex-col items-center justify-center space-y-6 py-10 animate-in fade-in duration-500">
        {errorMessage && (
            <div className="p-3 bg-red-100 text-tailor-bg rounded-xl text-sm">
                Ups, algo salió mal
            </div>
        )}
        {!errorMessage && (
        <p className="text-tailor-bg text-sm font-bold">
            Restaurante guardado
        </p>
        )}
        {!errorMessage && createdRestaurantId && (         
            <button
                onClick={() => router.push(`/restaurant/${createdRestaurantId}`)}
                className="px-8 py-2 border border-gray-400 rounded-full text-sm font-medium text-black hover:bg-gray-50 transition-all hover:cursor-pointer"
            >
                Ver restaurante
            </button>
        )}
         {errorMessage && (         
            <button
                onClick={() => router.push("/map")}
                className="px-8 py-2 border border-gray-400 rounded-full text-sm font-medium text-black hover:bg-gray-50 transition-all hover:cursor-pointer"
               
            >
                Volver
            </button>
        )}
           
        </div>
    )
}
