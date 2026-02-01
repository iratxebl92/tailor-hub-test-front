'use client'

import Link from "next/link"
import { Logo } from "../Icons/Logo"
import { RegisterStepOne } from "./RegisterSteps/RegisterStepOne"
import { RegisterStepTwo } from "./RegisterSteps/RegisterStepTwo"
import { useUserStore } from "@/store/userStore"
import { useRegister, useLogin } from "@/hooks/useAuth"

export const RegisterForm = () => {
  const { registerStep, registerForm, setAuthData, resetRegisterForm } = useUserStore()
  const { register, loading: registerLoading, error: registerError } = useRegister()
  const { login, loading: loginLoading, error: loginError } = useLogin()

  const handleRegister = async () => {
    // 1. Registrar usuario
    const user = await register(registerForm.username, registerForm.password)
    if (!user) return

    // 2. Auto-login después del registro
    const token = await login(registerForm.username, registerForm.password)
    if (!token) return

    // 3. Guardar datos de auth en el store
    setAuthData(token, user)
    resetRegisterForm()
    
    // 4. Pequeño delay para asegurar que la cookie se escriba, luego redirigir
    setTimeout(() => {
      window.location.href = '/map'
    }, 100)
  }

  const loading = registerLoading || loginLoading
  const error = registerError || loginError

  return (
    <div className={`bg-tailor-bg rounded-3xl flex flex-col w-full md:max-w-sm lg:max-w-md shadow-sm h-fit self-end ${registerStep === 1 ? 'p-6' : 'p-6 pb-4'}`}>
      <div className={`flex flex-col ${registerStep === 1 ? 'space-y-6' : 'space-y-4'}`}>
        <div className="flex items-center gap-3">
          <Logo className="w-32 h-8 text-white" />
        </div>

        {registerStep === 1 ? (
          <RegisterStepOne />
        ) : (
          <RegisterStepTwo 
            onSubmit={handleRegister}
            loading={loading}
            error={error}
          />
        )}

        {/* Login Link */}
        <div className="text-white text-sm sm:text-base">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="underline text-white/90 hover:text-white">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
