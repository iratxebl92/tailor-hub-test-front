"use client"

import Image from "next/image"
import { AddImageIcon } from "@/components/Icons/AddImageIcon"
import { useEditRestaurant } from "./hook/useEditRestaurant"
import { LoadingSpinner } from "@/components/core/LoadingSpinner"

interface EditImageUploaderProps {
    restaurantId: number | string
}

export function EditImageUploader({ restaurantId }: EditImageUploaderProps) {
    const { image, handleFileChange, handleRemoveImage, loading } = useEditRestaurant(restaurantId)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {!image ? (
                <label className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AddImageIcon />
                        <p className="text-sm text-gray-500 font-medium">Añadir imagen</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
            ) : (
                <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden group shadow-md">
                    <Image src={image} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={handleRemoveImage}
                            className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 hover:cursor-pointer"
                        >
                            Eliminar imagen
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
