"use client"

import { useState } from "react"

export function CommentForm() {
  const [rating, setRating] = useState(0)

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="focus:outline-none transition-transform hover:scale-110 hover:cursor-pointer"
          >
            <svg
              className={`w-6 h-6 ${
                star <= rating ? "fill-blue-500 text-blue-500" : "text-gray-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
      
      <textarea
        placeholder="Escribe tu comentario sobre el restaurante"
        className="w-full min-h-[120px] p-4 text-sm bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4"
      />
      
      <button className="w-fit px-8 py-2 bg-white border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors hover:cursor-pointer">
        Enviar
      </button>
    </div>
  )
}
