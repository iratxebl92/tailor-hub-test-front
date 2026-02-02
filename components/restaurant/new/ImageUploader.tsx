"use client"

import Image from "next/image"
import { useNewRestaurant } from "./hook/useNewRestaurant"

export function ImageUploader() {
    const { image, handleFileChange, handleRemoveImage } = useNewRestaurant()

    return (
        <div className="w-full max-w-sm">
        {!image ? (
            <label className="flex flex-col items-center justify-center w-full aspect-square border border-gray-400 rounded-3xl cursor-pointer hover:bg-gray-50 transition-colors bg-gray-100">
                <span className="text-gray-800 text-lg">Añadir imágen</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
        ) : (
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden group border border-gray-200 shadow-sm">
                <Image src={image} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-100 transition-opacity flex items-center justify-center ">
                    <button
                        onClick={handleRemoveImage}
                        className="px-6 py-2  text-white rounded-full border-2 text-sm font-bold hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer"
                    >
                        Eliminar imagen
                    </button>
                </div>
            </div>
        )}
    </div>
    )
}
