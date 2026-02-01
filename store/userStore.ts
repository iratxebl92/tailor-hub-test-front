import { create } from "zustand"
import { useEffect, useState } from "react"
import { authService } from "@/services/authService"

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
  
  // Función para validar y cargar desde localStorage
  validateAndLoadToken: () => Promise<boolean>

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
  // Auth - estado inicial vacío (se valida con el servidor en el cliente)
  token: null,
  user: null,
  isAuthenticated: false,

  // ========================================
  // VALIDAR TOKEN CON EL SERVIDOR
  // Si el servidor se reinició, el token será inválido
  // y limpiamos la cookie + localStorage
  // ========================================
  validateAndLoadToken: async () => {
    const { token } = loadFromStorage()
    
    // Si no hay token guardado, no hay nada que validar
    if (!token) {
      return false
    }

    try {
      // Preguntar al servidor si el token es válido
      const response = await authService.validateToken(token)
      
      if (response.data?.valid && response.data?.user) {
        // Token válido - el usuario existe en el servidor
        const user = response.data.user
        set({ token, user, isAuthenticated: true })
        return true
      } else {
        // Token inválido - el servidor se reinició o el usuario no existe
        // Limpiamos todo y redirigimos a login
        console.log("[Auth] Token inválido - limpiando sesión")
        deleteTokenCookie()
        clearStorage()
        set({ user: null, token: null, isAuthenticated: false })
        return false
      }
    } catch {
      // Error de conexión - limpiamos por seguridad
      console.log("[Auth] Error validando token - limpiando sesión")
      deleteTokenCookie()
      clearStorage()
      set({ user: null, token: null, isAuthenticated: false })
      return false
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
// HOOK PARA VALIDAR SESIÓN AL CARGAR LA APP
// ============================================
// Este hook valida con el servidor si el token es válido
// Si el servidor se reinició, redirige a login
export function useAuthSync() {
  const validateAndLoadToken = useUserStore((state) => state.validateAndLoadToken)
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const [isValidating, setIsValidating] = useState(true)
  
  useEffect(() => {
    // Validar el token con el servidor cuando la app carga
    const validate = async () => {
      const isValid = await validateAndLoadToken()
      setIsValidating(false)
      
      // Si el token no es válido y estamos en una ruta protegida, redirigir a login
      if (!isValid && typeof window !== "undefined") {
        const publicRoutes = ["/", "/login", "/register"]
        const currentPath = window.location.pathname
        
        if (!publicRoutes.includes(currentPath)) {
          window.location.href = "/login"
        }
      }
    }
    
    validate()
  }, [validateAndLoadToken])
  
  return { 
    isLoaded: !isValidating,
    isAuthenticated 
  }
}
