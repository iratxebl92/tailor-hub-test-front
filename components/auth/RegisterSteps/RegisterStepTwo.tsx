"use client"

import { EyeIcon } from '@/components/Icons/EyeIcon'
import { EyeOffIcon } from '@/components/Icons/EyeOffIcon'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'

interface RegisterStepTwoProps {
  onSubmit: () => void
  loading: boolean
  error: string | null
}

export const RegisterStepTwo = ({ onSubmit, loading, error }: RegisterStepTwoProps) => {
  const { registerForm, setRegisterPassword, setRegisterStep } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerForm.password.trim()) return
    onSubmit()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }


  return (
    <>
      <button
        onClick={() => setRegisterStep(1)}
        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors self-start hover:cursor-pointer"
      >
        ←
      </button>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-white font-bold text-lg sm:text-xl">
          Crea una contraseña nueva
        </h2>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <div className="flex flex-col space-y-2">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Añade una contraseña"
              value={registerForm.password}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 pr-12 rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors hover:cursor-pointer"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <EyeIcon />
              ) : (
                <EyeOffIcon />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black font-bold py-3 rounded-full hover:bg-white/90 transition-colors self-start px-8 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registrando...' : 'Finalizar'}
        </button>
      </form>
    </>
  )
}
