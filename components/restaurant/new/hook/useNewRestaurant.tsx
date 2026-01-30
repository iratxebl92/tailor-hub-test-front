"use client"

import { useMemo, useCallback } from "react"
import { useRestaurants, useCreateRestaurant } from "@/hooks/useRestaurants"
import { useNewRestaurantStore } from "@/store/store"

export const useNewRestaurant = () => {
    // Estado desde Zustand
    const {
        name,
        address,
        description,
        image,
        isSaved,
        validationError,
        setName,
        setAddress,
        setDescription,
        setImage,
        setIsSaved,
        setValidationError,
        reset,
    } = useNewRestaurantStore()

    // Hooks externos
    const { restaurants } = useRestaurants()
    const { createRestaurant, loading, error: apiError } = useCreateRestaurant()

    // Coordenadas aleatorias cerca de un restaurante existente
    const newLatLng = useMemo(() => {
        if (!restaurants || restaurants.length === 0) {
            return { lat: 40.4168, lng: -3.7038 }
        }
        const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)]
        const offset = () => (Math.random() * 0.01) - 0.005
        return {
            lat: randomRestaurant.latlng.lat + offset(),
            lng: randomRestaurant.latlng.lng + offset(),
        }
    }, [restaurants])

    // Manejar cambio de imagen
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

    // Eliminar imagen
    const handleRemoveImage = useCallback(() => {
        setImage(null)
    }, [setImage])

    // Validar campos
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

    // Guardar restaurante
    const handleSave = useCallback(async () => {
        if (!validateFields()) return

        const restaurantData = {
            name: name.trim(),
            address: address.trim(),
            neighborhood: description.trim(),
            photograph: image || "",
            image: image || "",
            cuisine_type: "General",
            latlng: newLatLng,
            operating_hours: {
                Monday: "9:00 - 22:00",
                Tuesday: "9:00 - 22:00",
                Wednesday: "9:00 - 22:00",
                Thursday: "9:00 - 22:00",
                Friday: "9:00 - 23:00",
                Saturday: "10:00 - 23:00",
                Sunday: "10:00 - 21:00",
            },
            reviews: [],
        }

        const result = await createRestaurant(restaurantData)
        if (result) {
            setIsSaved(true)
        }
    }, [validateFields, name, address, description, image, newLatLng, createRestaurant, setIsSaved])

    // Resetear todo
    const handleReset = useCallback(() => {
        reset()
    }, [reset])

    const errorMessage = validationError || apiError

    return {
        // Campos del formulario
        name,
        setName,
        address,
        setAddress,
        description,
        setDescription,
        // Imagen
        image,
        handleFileChange,
        handleRemoveImage,
        // Estados
        isSaved,
        loading,
        errorMessage,
        // Acciones
        handleSave,
        handleReset,
    }
}
