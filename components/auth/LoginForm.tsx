'use client'

import { useState } from "react"
import { Logo } from "../Icons/Logo"
import Link from "next/link"
import { useLogin } from "@/hooks/useAuth"
import { useUserStore } from "@/store/userStore"

export const LoginForm = () => {
  const { login, loading, error } = useLogin()
  const setAuthData = useUserStore((state) => state.setAuthData)
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const token = await login(username, password)
    
    if (token) {
      // Guardar en el store (que también guarda en cookie)
      setAuthData(token, { id: 0, username })
      // Pequeño delay para asegurar que la cookie se escriba, luego redirigir
      setTimeout(() => {
        window.location.href = "/map"
      }, 100)
    }
  }

  return (
    <div className="bg-tailor-bg rounded-3xl p-6  flex flex-col w-full lg:max-w-md shadow-sm h-fit self-end">
      <div className="flex flex-col space-y-6">
      
        <div className="flex items-center gap-3">
          <Logo className="w-32 h-8 text-white" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
       
          <div className="flex flex-col space-y-2">
            <label className="text-white font-bold text-sm sm:text-base">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Escribe tu usuario"
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
            />
          </div>

   
          <div className="flex flex-col space-y-2">
            <label className="text-white font-bold text-sm sm:text-base">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribe tu contraseña"
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
       
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-white/90 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cargando..." : "Siguiente"}
          </button>
        </form>

      
        <div className="text-white text-sm sm:text-base">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="underline text-white/90 hover:text-white">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}
