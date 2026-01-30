

import { TwoColumnSection } from "@/components/layouts/TwoColumnSection"
import { LoginForm } from "@/components/auth/LoginForm"
import { Metadata } from "next"
import { Footer } from "@/components/core/Footer"

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
      <Footer
        className="pb-2 pl-4 sm:pl-6 md:pl-8"
      />
    </main>
  )
}
