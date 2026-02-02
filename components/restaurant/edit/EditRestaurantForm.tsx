"use client"

import { useEditRestaurant } from "./hook/useEditRestaurant"

interface EditRestaurantFormProps {
    restaurantId: number | string
}

export function EditRestaurantForm({ restaurantId }: EditRestaurantFormProps) {
    const { 
        name, 
        setName, 
        address, 
        setAddress, 
        description, 
        setDescription, 
        loading,
        loadingRestaurant,
        errorMessage, 
        handleUpdate 
    } = useEditRestaurant(restaurantId)

    if (loadingRestaurant) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-600">Cargando restaurante...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {errorMessage && (
                <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                    {errorMessage}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                        Nombre
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
                        Dirección
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Dirección del restaurante"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        placeholder="Describe el restaurante..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-32 px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-fit px-12 py-3 bg-white border border-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition-all transform active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                >
                    {loading ? "Actualizando..." : "Actualizar"}
                </button>
            </div>
        </div>
    )
}
