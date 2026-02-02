import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { UserHeader } from "../UserHeader"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}))
vi.mock("@/store/authStore", () => ({
  useAuthStore: vi.fn(),
}))
vi.mock("@/store/restaurantStore", () => ({
  useRestaurantUIStore: () => ({
    isUserMenuOpen: true,
    setIsUserMenuOpen: vi.fn(),
  }),
}))

describe('UserHeader Component', () => {
  beforeEach(() => {
    vi.mocked(useAuthStore).mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: vi.fn(),
    })
  })


  it('should render the component correctly', () => {
    const { container } = render(<UserHeader />)
    const userHeaderButton = container.querySelector('button')
    expect(userHeaderButton).toBeInTheDocument()
  })
  it('should have the attribute aria-label="User menu"', () => {
    render(<UserHeader />)
    const userHeaderButton = screen.getByRole('button')
    expect(userHeaderButton).toHaveAttribute('aria-label', 'User menu')
  })
  it('should navigate to login page when user button is clicked and not authenticated', () => {
  
    render(<UserHeader />)
    const miCuentaLink = screen.getByLabelText('My account')
    miCuentaLink.click()
    expect(useRouter().push).toHaveBeenCalledWith('/login')
  })
  it('should show the "My account" link with href to /profile when authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      user: { username: "test" },
      isAuthenticated: true,
      logout: vi.fn(),
    })
    render(<UserHeader />)
    const miCuentaLink = screen.getByLabelText('My account')
    expect(miCuentaLink).toHaveAttribute('href', '/profile')
  })
  it('should have the href attribute to /restaurant/new when authenticated', () => {

    vi.mocked(useAuthStore).mockReturnValue({
      user: { username: "test" },
      isAuthenticated: true,
      logout: vi.fn(),
    })
    render(<UserHeader />)
    const añadirRestauranteLink = screen.getByLabelText('Add restaurant')
    expect(añadirRestauranteLink).toHaveAttribute('href', '/restaurant/new')
  })
})