'use client'

import { Logo } from "../Icons/Logo"
import Link from "next/link"

export const LoginForm = () => {
  return (
    <div className="bg-tailor-bg rounded-3xl p-6  flex flex-col w-full lg:max-w-md shadow-sm h-fit self-end">
      <div className="flex flex-col space-y-6">
      
        <div className="flex items-center gap-3">
          <Logo className="w-32 h-8 text-white" />
        </div>

        <form className="flex flex-col space-y-6">
       
          <div className="flex flex-col space-y-2">
            <label className="text-white font-bold text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              placeholder="Escribe tu email"
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

   
          <div className="flex flex-col space-y-2">
            <label className="text-white font-bold text-sm sm:text-base">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Escribe tu contraseña"
              className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

       
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-white/90 transition-colors hover:cursor-pointer"
          >
            Siguiente
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
