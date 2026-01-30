'use client'

import Link from "next/link"
import { Logo } from "../Icons/Logo"

import { RegisterStepOne } from "./RegisterSteps/RegisterStepOne"
import { RegisterStepTwo } from "./RegisterSteps/RegisterStepTwo"
import { useRestaurantStore } from "@/store/store"

export const RegisterForm = () => {


  const { registerStep } = useRestaurantStore()
  return (
    <div className={`bg-tailor-bg rounded-3xl flex flex-col w-full md:max-w-sm lg:max-w-md shadow-sm h-fit self-end ${registerStep === 1 ? 'p-6' : 'p-6 pb-4'}`}>
      <div className={`flex flex-col ${registerStep === 1 ? 'space-y-6' : 'space-y-4'}`}>
     
        <div className="flex items-center gap-3">
          <Logo className="w-32 h-8 text-white" />
        </div>

        {registerStep === 1 ? (
        
          <RegisterStepOne />
        ) : (
      
          <RegisterStepTwo />
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
