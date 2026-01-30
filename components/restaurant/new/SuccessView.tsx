"use client"

import { useRouter } from "next/navigation"
import { useNewRestaurant } from "./hook/useNewRestaurant"
import { CheckIcon } from "@/components/Icons/CheckIcon"

export function SuccessView() {
    const router = useRouter()
    const { handleReset } = useNewRestaurant()

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckIcon />
            </div>

            <h2 className="text-3xl font-bold text-black mb-2">
                Restaurante guardado
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
                Tu nuevo restaurante favorito ha sido añadido correctamente a la lista.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => router.push("/map")}
                    className="px-10 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg hover:cursor-pointer"
                >
                    Ver restaurante
                </button>
                <button
                    onClick={handleReset}
                    className="px-10 py-3 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors hover:cursor-pointer"
                >
                    Añadir otro
                </button>
            </div>
        </div>
    )
}
