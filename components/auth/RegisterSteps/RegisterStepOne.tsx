"use client"

import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'

export const RegisterStepOne = () => {
  const router = useRouter()
  const { 
    registerForm, 
    setRegisterEmail, 
    setRegisterUsername, 
    setRegisterStep 
  } = useUserStore()

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    // Validar que email y username no estén vacíos
    if (registerForm.email.trim() && registerForm.username.trim()) {
      //si no es "" y no es undefined
      setRegisterStep(2)
    }
  }

  return (
    <>
      <button
        onClick={() => router.push('/login')}
        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors self-start hover:cursor-pointer"
      >
        ←
      </button>
      <form className="flex flex-col space-y-6" onSubmit={handleNext}>
        <div className="flex flex-col space-y-2">
          <label className="text-white font-bold text-sm sm:text-base">
            Email:
          </label>
          <input
            type="email"
            placeholder="Añade tu email"
            value={registerForm.email}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full border-2 border-white bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-white font-bold text-sm sm:text-base">
            Nombre de usuario:
          </label>
          <input
            type="text"
            placeholder="Añade tu nombre"
            value={registerForm.username}
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
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
    </>
  )
}