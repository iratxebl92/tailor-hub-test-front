"use client"

import type { Comment, Review } from "@/domain/types"
import { CommentCard } from "./CommentCard"

type CommentListProps = {
  reviews: Review[]
}

function reviewToComment(review: Review, index: number): Comment {
  return {
    id: index + 1,
    author: review.name,
    rating: review.rating,
    text: review.comments,
    isOwn: false, 
  }
}

export function CommentList({ reviews }: CommentListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay comentarios todavía. ¡Sé el primero en comentar!</p>
      </div>
    )
  }

  const comments = reviews.map(reviewToComment)

  return (
    <div className="flex flex-col">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
