"use client"

import { useState } from "react"
import { UserHeader } from "@/components/core/UserHeader"
import { ImageUploader } from "./ImageUploader"
import { NewRestaurantForm } from "./NewRestaurantForm"
import { SuccessView } from "./SuccessView"

export function NewRestaurantPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
  }

  const handleReset = () => {
    setImage(null)
    setIsSaved(false)
  }

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
              
              <ImageUploader 
                image={image} 
                onImageUpload={setImage} 
                onImageRemove={() => setImage(null)} 
              />
              
              <NewRestaurantForm onSave={handleSave} />
            </div>
          ) : (
            <SuccessView onReset={handleReset} />
          )}
        </div>
      </div>

 
      <footer className="py-6 px-4 sm:px-6 md:px-8 border-t border-gray-50">
        <p className="text-xs text-footer-color text-center sm:text-left">
          Prueba técnica © Tailor hub SL 2019 – 2026
        </p>
      </footer>
    </main>
  )
}
