"use client"

import { UserHeader, Footer } from "@/components/core"
import { EditImageUploader } from "./EditImageUploader"
import { EditRestaurantForm } from "./EditRestaurantForm"
import { EditSuccessView } from "./EditSuccessView"
import { useEditRestaurant } from "./hook/useEditRestaurant"

interface EditRestaurantPageProps {
    restaurantId: number | string
}

export function EditRestaurantPage({ restaurantId }: EditRestaurantPageProps) {
    const { isUpdated } = useEditRestaurant(restaurantId)

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
                <UserHeader />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
                    {!isUpdated ? (
                        <div className="space-y-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8">
                                Editar Restaurante
                            </h1>
                            <EditImageUploader restaurantId={restaurantId} />
                            <EditRestaurantForm restaurantId={restaurantId} />
                        </div>
                    ) : (
                        <EditSuccessView restaurantId={restaurantId} />
                    )}
                </div>
            </div>

            <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
        </main>
    )
}
