import { create } from "zustand"

type RestaurantStore = {
  registerStep: 1 | 2
  setRegisterStep: (step: 1 | 2) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (isOpen: boolean) => void
  selectedRestaurantId: number | null
  setSelectedRestaurantId: (id: number | null) => void
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  registerStep: 1,
  setRegisterStep: (step) => set({ registerStep: step }),
  isUserMenuOpen: false,
  setIsUserMenuOpen: (isOpen) => set({ isUserMenuOpen: isOpen }),
  selectedRestaurantId: null,
  setSelectedRestaurantId: (id) => set({ selectedRestaurantId: id }),
}))