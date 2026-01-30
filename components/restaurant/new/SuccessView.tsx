"use client"

import { useRouter } from "next/navigation"

type SuccessViewProps = {
  onReset: () => void
}

export function SuccessView({ onReset }: SuccessViewProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
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
          className="px-10 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg"
        >
          Ver restaurante
        </button>
        <button
          onClick={onReset}
          className="px-10 py-3 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Añadir otro
        </button>
      </div>
    </div>
  )
}
