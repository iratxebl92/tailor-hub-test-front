"use client"

import { use } from "react"
import { EditRestaurantPage } from "@/components/restaurant/edit/EditRestaurantPage"

interface EditRestaurantRouteProps {
    params: Promise<{
        id: string
    }>
}

export default function EditRestaurantRoute({ params }: EditRestaurantRouteProps) {
    const { id } = use(params)
    
    return <EditRestaurantPage restaurantId={id} />
}
