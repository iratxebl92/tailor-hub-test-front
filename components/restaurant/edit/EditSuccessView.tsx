"use client"

import { useRouter } from "next/navigation"
import { useEditRestaurant } from "./hook/useEditRestaurant"
import { CheckIcon } from "@/components/Icons/CheckIcon"

interface EditSuccessViewProps {
    restaurantId: number | string
}

export function EditSuccessView({ restaurantId }: EditSuccessViewProps) {
    const router = useRouter()
    const { handleReset } = useEditRestaurant(restaurantId)

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckIcon />
            </div>

            <h2 className="text-3xl font-bold text-black mb-2">
                Restaurante actualizado
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
                Los datos del restaurante han sido actualizados correctamente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => router.push(`/restaurant/${restaurantId}`)}
                    className="px-10 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg hover:cursor-pointer"
                >
                    Ver restaurante
                </button>
                <button
                    onClick={() => {
                        handleReset()
                        router.push("/map")
                    }}
                    className="px-10 py-3 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors hover:cursor-pointer"
                >
                    Volver al mapa
                </button>
            </div>
        </div>
    )
}
