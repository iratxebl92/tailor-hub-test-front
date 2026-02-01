import { create } from "zustand"
import { useEffect } from "react"

// Tipos
export interface User {
  id: number
  username: string
  email?: string
}

interface RegisterFormData {
  email: string
  username: string
  password: string
}

interface UserStore {
  // Auth
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuthData: (token: string, user: User) => void
  logout: () => void
  
  // Función para cargar desde localStorage (llamada manualmente en cliente)
  loadFromLocalStorage: () => void

  // Registro
  registerStep: 1 | 2
  registerForm: RegisterFormData
  setRegisterStep: (step: 1 | 2) => void
  setRegisterEmail: (email: string) => void
  setRegisterUsername: (username: string) => void
  setRegisterPassword: (password: string) => void
  resetRegisterForm: () => void
}

// ============================================
// FUNCIONES PARA COOKIES Y LOCALSTORAGE
// ============================================

// Cookie simple para el middleware de Next.js
function setTokenCookie(token: string) {
  if (typeof document === "undefined") return
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `auth_token=${token}; expires=${expires}; path=/`
}

function deleteTokenCookie() {
  if (typeof document === "undefined") return
  document.cookie = `auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

// LocalStorage para persistir datos del usuario
function saveToStorage(token: string, user: User) {
  if (typeof localStorage === "undefined") return
  localStorage.setItem("auth_token", token)
  localStorage.setItem("auth_user", JSON.stringify(user))
}

function loadFromStorage(): { token: string | null; user: User | null } {
  if (typeof localStorage === "undefined") return { token: null, user: null }
  const token = localStorage.getItem("auth_token")
  const userStr = localStorage.getItem("auth_user")
  const user = userStr ? JSON.parse(userStr) : null
  return { token, user }
}

function clearStorage() {
  if (typeof localStorage === "undefined") return
  localStorage.removeItem("auth_token")
  localStorage.removeItem("auth_user")
}

// ============================================
// STORE
// ============================================

export const useUserStore = create<UserStore>((set) => ({
  // Auth - estado inicial vacío (se carga desde localStorage en el cliente)
  token: null,
  user: null,
  isAuthenticated: false,

  // Cargar datos desde localStorage (llamar en useEffect del cliente)
  loadFromLocalStorage: () => {
    const { token, user } = loadFromStorage()
    if (token && user) {
      set({ token, user, isAuthenticated: true })
    }
  },

  setAuthData: (token, user) => {
    // 1. Guardar cookie (para el middleware de Next.js)
    setTokenCookie(token)
    // 2. Guardar en localStorage (para el estado del cliente)
    saveToStorage(token, user)
    // 3. Actualizar estado de Zustand
    set({ token, user, isAuthenticated: true })
  },

  logout: () => {
    // 1. Eliminar cookie
    deleteTokenCookie()
    // 2. Limpiar localStorage
    clearStorage()
    // 3. Actualizar estado
    set({ user: null, token: null, isAuthenticated: false })
    // 4. Redirigir a login
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  },

  // Registro
  registerStep: 1,
  registerForm: { email: "", username: "", password: "" },

  setRegisterStep: (step) => set({ registerStep: step }),
  setRegisterEmail: (email) =>
    set((state) => ({ registerForm: { ...state.registerForm, email } })),
  setRegisterUsername: (username) =>
    set((state) => ({ registerForm: { ...state.registerForm, username } })),
  setRegisterPassword: (password) =>
    set((state) => ({ registerForm: { ...state.registerForm, password } })),
  resetRegisterForm: () =>
    set({ registerForm: { email: "", username: "", password: "" }, registerStep: 1 }),
}))

// ============================================
// HOOK PARA SINCRONIZAR CON LOCALSTORAGE
// ============================================
// Usar este hook en componentes que necesitan el estado de auth
export function useAuthSync() {
  const loadFromLocalStorage = useUserStore((state) => state.loadFromLocalStorage)
  const token = useUserStore((state) => state.token)
  
  useEffect(() => {
    // Cargar desde localStorage cuando el componente se monta en el cliente
    loadFromLocalStorage()
  }, [loadFromLocalStorage])
  
  return { isLoaded: token !== null }
}
