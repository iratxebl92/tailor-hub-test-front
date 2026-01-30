'use client'
import { useRouter } from 'next/navigation'
import { Logo } from "../../Icons/Logo"

export const OnboardingMessage = () => {
  const router = useRouter()
  return (
    <div className="bg-primary-bg rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between w-full md:max-w-sm lg:max-w-md shadow-sm h-fit self-end">
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Logo className="w-32 h-8 text-black" />
      </div>

      <div className="space-y-3 text-sm sm:text-base md:text-xl">
        <p>Hola,</p>
        <p>
          Bienvenido a la prueba de Tailor hub, en ella has de añadir los
          restaurantes favoritos donde te gustaría ir en tu onboarding.
        </p>
      </div>
    </div>

    <div className="mt-8 flex flex-col gap-4">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-black px-6 py-2 text-sm sm:text-base font-medium text-black hover:bg-black hover:text-white hover:cursor-pointer transition-colors"
        onClick={() => router.push('/login')}
      >
        Entrar
      </button>


    </div>
  </div>
  )
}
