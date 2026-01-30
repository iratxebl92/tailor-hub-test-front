"use client"

import { UserHeader } from "@/components/core/UserHeader"
import { ImageUploader } from "./ImageUploader"
import { NewRestaurantForm } from "./NewRestaurantForm"
import { SuccessView } from "./SuccessView"
import { Footer } from "@/components/core/Footer"
import { useNewRestaurant } from "./hook/useNewRestaurant"

export function NewRestaurantPage() {
    const { isSaved } = useNewRestaurant()

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
                <UserHeader />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
                    {!isSaved ? (
                        <div className="space-y-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8">
                                Nuevo Restaurante
                            </h1>
                            <ImageUploader />
                            <NewRestaurantForm />
                        </div>
                    ) : (
                        <SuccessView />
                    )}
                </div>
            </div>

            <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
        </main>
    )
}
