import { create } from "zustand"

// Types
export interface User {
  id: number
  username: string
  email?: string
}

// Register form data
interface RegisterFormData {
  email: string
  username: string
  password: string
}

// Store type
type UserStore = {
  // Auth state
  user: User | null
  token: string | null
  isAuthenticated: boolean

  // Register step state
  registerStep: 1 | 2
  setRegisterStep: (step: 1 | 2) => void

  // Register form data
  registerForm: RegisterFormData
  setRegisterEmail: (email: string) => void
  setRegisterUsername: (username: string) => void
  setRegisterPassword: (password: string) => void
  resetRegisterForm: () => void

  // Auth state setters
  setAuthData: (token: string, user: User) => void
  logout: () => void
}

const initialRegisterForm: RegisterFormData = {
  email: "",
  username: "",
  password: "",
}

export const useUserStore = create<UserStore>((set) => ({
  // Initial auth state
  user: null,
  token: null,
  isAuthenticated: false,

  // Register step
  registerStep: 1,
  setRegisterStep: (step) => set({ registerStep: step }),

  // Register form data
  registerForm: { ...initialRegisterForm },
  setRegisterEmail: (email) => 
    set((state) => ({ 
      registerForm: { ...state.registerForm, email } 
    })),
  setRegisterUsername: (username) => 
    set((state) => ({ 
      registerForm: { ...state.registerForm, username } 
    })),
  setRegisterPassword: (password) => 
    set((state) => ({ 
      registerForm: { ...state.registerForm, password } 
    })),
  resetRegisterForm: () => 
    set({ 
      registerForm: { ...initialRegisterForm },
      registerStep: 1,
    }),

  // Auth state setters
  setAuthData: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
    set({
      token,
      user,
      isAuthenticated: true,
    })
  },

  // Logout
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },
}))
