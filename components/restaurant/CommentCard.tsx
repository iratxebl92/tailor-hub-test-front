"use client"

import type { Comment } from "@/domain/types"

type CommentCardProps = {
  comment: Comment
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="py-8 border-b border-gray-100 last:border-none">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="flex flex-col sm:w-48 shrink-0">
          <h4 className="font-bold text-lg text-black mb-1 truncate">
            {comment.author}
          </h4>
          <div className="flex gap-0.5 mb-2 sm:mb-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= comment.rating ? "fill-blue-500 text-blue-500" : "text-gray-300"
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
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {comment.text}
          </p>
          
          {comment.isOwn && (
            <div className="flex gap-3 self-center sm:self-start mt-2">
              <button className="px-6 py-1.5 border border-black rounded-full text-xs font-medium hover:bg-black hover:text-white transition-colors hover:cursor-pointer">
                Editar
              </button>
              <button className="px-6 py-1.5 border border-black rounded-full text-xs font-medium hover:bg-black hover:text-white transition-colors hover:cursor-pointer">
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
