"use client"

import { useCallback, useEffect } from "react"
import { useRestaurant, useUpdateRestaurant } from "@/hooks/useRestaurants"
import { useEditRestaurantStore } from "@/store/restaurantStore"
import { useRouter } from "next/navigation"

export const useEditRestaurant = (restaurantId: number | string) => {
    const router = useRouter()
    const {
        id,
        name,
        address,
        description,
        image,
        isUpdated,
        validationError,
        setName,
        setAddress,
        setDescription,
        setImage,
        setIsUpdated,
        setValidationError,
        initializeFromRestaurant,
        reset,
    } = useEditRestaurantStore()


    const { restaurant, loading: loadingRestaurant, error: loadError } = useRestaurant(restaurantId)
    const { updateRestaurant, loading: updating, error: updateError } = useUpdateRestaurant()


    useEffect(() => {
        if (restaurant) {
            initializeFromRestaurant({
                id: restaurant.id,
                name: restaurant.name,
                address: restaurant.address,
                neighborhood: restaurant.neighborhood,
                image: restaurant.image,
            })
        }
    }, [restaurant, initializeFromRestaurant])

   
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }, [setImage])

   
    const handleRemoveImage = useCallback(() => {
        setImage(null)
    }, [setImage])

 
    const validateFields = useCallback((): boolean => {
        setValidationError("")
        if (!name.trim()) {
            setValidationError("El nombre es obligatorio")
            return false
        }
        if (!address.trim()) {
            setValidationError("La dirección es obligatoria")
            return false
        }
        if (!description.trim()) {
            setValidationError("La descripción es obligatoria")
            return false
        }
        return true
    }, [name, address, description, setValidationError])

   
    const handleUpdate = useCallback(async () => {
        if (!validateFields() || !id) return

        const restaurantData = {
            name: name.trim(),
            address: address.trim(),
            neighborhood: description.trim(),
            photograph: image || restaurant?.photograph || "",
            image: image || restaurant?.image || "",
            cuisine_type: restaurant?.cuisine_type || "General",
            latlng: restaurant?.latlng || { lat: 40.4168, lng: -3.7038 },
            operating_hours: restaurant?.operating_hours || {
                Monday: "9:00 - 22:00",
                Tuesday: "9:00 - 22:00",
                Wednesday: "9:00 - 22:00",
                Thursday: "9:00 - 22:00",
                Friday: "9:00 - 23:00",
                Saturday: "10:00 - 23:00",
                Sunday: "10:00 - 21:00",
            },
            reviews: restaurant?.reviews || [],
        }

        const result = await updateRestaurant(id, restaurantData)
        if (result) {
            setIsUpdated(true)
        }
        router.push(`/restaurant/${id}`)
    }, [validateFields, id, name, address, description, image, restaurant, updateRestaurant, setIsUpdated])

 
    const handleReset = useCallback(() => {
        reset()
    }, [reset])

    const loading = loadingRestaurant || updating
    const errorMessage = validationError || updateError || loadError

    return {
  
        name,
        setName,
        address,
        setAddress,
        description,
        setDescription,
        image,
        handleFileChange,
        handleRemoveImage,
        isUpdated,
        loading,
        loadingRestaurant,
        errorMessage,
        restaurant,
        handleUpdate,
        handleReset,
    }
}
