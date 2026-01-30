

import { TwoColumnSection } from "@/components/layouts/TwoColumnSection"
import { LoginForm } from "@/components/auth/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',
}

export default function LoginPage() {
  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden ">
      <div className="h-full overflow-hidden p-4 sm:p-6 md:p-8 ">
        <TwoColumnSection
          leftContent={<LoginForm />}
          rightImageSrc="/images/login-image.avif"
          rightImageAlt="Imagen de login"
        />
      </div>
      <footer className="pb-2 pl-4 sm:pl-6 md:pl-8">
        <p className="text-xs text-footer-color">
          Prueba técnica ©Tailor hub SL 2019 – 2026
        </p>
      </footer>
    </main>
  )
}
