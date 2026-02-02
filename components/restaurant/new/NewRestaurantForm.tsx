"use client"

import { useNewRestaurant } from "./hook/useNewRestaurant"
import { restaurantService } from '../../../services/restaurantService';

export function NewRestaurantForm() {
    const { 
        name, 
        setName, 
        address, 
        setAddress, 
        description, 
        setDescription, 
        loading, 
        errorMessage, 
        handleSave 
    } = useNewRestaurant()

    return (
        <div className="space-y-6 ">
            {errorMessage && (
                <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                    {errorMessage}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                        Nombre del restaurante
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre del restaurante"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                        Dirección del restaurante
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                        Descripción del restaurante
                    </label>
                    <textarea
                        id="description"
                        placeholder="Escribe información acerca del restaurante"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-32 px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-10 py-2.5 border border-slate-400 rounded-full text-black font-bold hover:bg-black hover:text-white transition-all w-full sm:w-auto hover:cursor-pointer"
                >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </div>
    )
}
