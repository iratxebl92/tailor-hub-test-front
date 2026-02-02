"use client"

import { useEffect } from "react"
import { UserHeader, Footer, LoadingSpinner } from "@/components/core"
import { NewRestaurantForm, SuccessView, useNewRestaurant, ImageUploader } from "@/components/restaurant/new"

export function NewRestaurantPage() {
    const { isSaved, loading, handleReset } = useNewRestaurant()

    // Resetear el formulario al entrar a la página
    useEffect(() => {
        handleReset()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">

            <UserHeader />
            </div>

            <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 flex flex-col items-center justify-center">
                <img src="/images/tailor-hub-icon.avif" alt="Tailor Hub icon" className="w-15 h-15 mb-10" />
                {!isSaved ? (
                    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="w-full flex justify-center md:justify-end">
                             <ImageUploader />
                        </div>
                       
                        <div className="w-full ">
                            <NewRestaurantForm />
                        </div>
                    </div>
                ) : (
                    <SuccessView />
                )}
                <img src="/images/tailor-hub-icon.avif" alt="Tailor Hub icon" className="w-15 h-15 mt-10" />
            </div>

            <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
        </main>
    )
}
