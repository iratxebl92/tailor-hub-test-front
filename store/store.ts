import { create } from "zustand"

type RestaurantStore = {
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isOpen: boolean) => void
  selectedRestaurantId: number | null
  setSelectedRestaurantId: (id: number | null) => void
}

//Store general de la aplicación

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  isUserMenuOpen: false,
  setIsUserMenuOpen: (isOpen) => set({ isUserMenuOpen: isOpen }),
  selectedRestaurantId: null,
  setSelectedRestaurantId: (id) => set({ selectedRestaurantId: id }),
}))

// Store para nuevo restaurante
type NewRestaurantStore = {
  name: string
  address: string
  description: string
  image: string | null
  isSaved: boolean
  validationError: string
  createdRestaurantId: number | null
  setName: (value: string) => void
  setAddress: (value: string) => void
  setDescription: (value: string) => void
  setImage: (value: string | null) => void
  setIsSaved: (value: boolean) => void
  setValidationError: (value: string) => void
  setCreatedRestaurantId: (value: number | null) => void
  reset: () => void
}

export const useNewRestaurantStore = create<NewRestaurantStore>((set) => ({
  name: "",
  address: "",
  description: "",
  image: null,
  isSaved: false,
  validationError: "",
  createdRestaurantId: null,
  setName: (value) => set({ name: value }),
  setAddress: (value) => set({ address: value }),
  setDescription: (value) => set({ description: value }),
  setImage: (value) => set({ image: value }),
  setIsSaved: (value) => set({ isSaved: value }),
  setValidationError: (value) => set({ validationError: value }),
  setCreatedRestaurantId: (value) => set({ createdRestaurantId: value }),
  reset: () => set({
    name: "",
    address: "",
    description: "",
    image: null,
    isSaved: false,
    validationError: "",
    createdRestaurantId: null,
  }),
}))

// Store para editar restaurante
type EditRestaurantStore = {
  id: number | null
  name: string
  address: string
  description: string
  image: string | null
  isUpdated: boolean
  validationError: string
  setId: (value: number | null) => void
  setName: (value: string) => void
  setAddress: (value: string) => void
  setDescription: (value: string) => void
  setImage: (value: string | null) => void
  setIsUpdated: (value: boolean) => void
  setValidationError: (value: string) => void
  initializeFromRestaurant: (restaurant: {
    id: number
    name: string
    address: string
    neighborhood: string
    image: string
  }) => void
  reset: () => void
}

export const useEditRestaurantStore = create<EditRestaurantStore>((set) => ({
  id: null,
  name: "",
  address: "",
  description: "",
  image: null,
  isUpdated: false,
  validationError: "",
  setId: (value) => set({ id: value }),
  setName: (value) => set({ name: value }),
  setAddress: (value) => set({ address: value }),
  setDescription: (value) => set({ description: value }),
  setImage: (value) => set({ image: value }),
  setIsUpdated: (value) => set({ isUpdated: value }),
  setValidationError: (value) => set({ validationError: value }),
  initializeFromRestaurant: (restaurant) => set({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    description: restaurant.neighborhood,
    image: restaurant.image || null,
    isUpdated: false,
    validationError: "",
  }),
  reset: () => set({
    id: null,
    name: "",
    address: "",
    description: "",
    image: null,
    isUpdated: false,
    validationError: "",
  }),
}))