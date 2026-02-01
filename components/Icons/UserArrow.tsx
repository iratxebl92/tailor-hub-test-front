
import { useRestaurantUIStore } from "@/store/restaurantStore"

export const UserArrow = () => {
    const { isUserMenuOpen } = useRestaurantUIStore()
  return (
    <svg
    className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
  )
}
