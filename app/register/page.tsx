
import { TwoColumnSection } from "@/components/layouts/TwoColumnSection"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { Metadata } from "next"
import { Footer } from "@/components/core/Footer"

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register page',
}
export default function RegisterPage() {
  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="h-full overflow-hidden p-4 sm:p-6 md:p-8">
        <TwoColumnSection
          leftContent={<RegisterForm />}
          rightImageSrc="/images/register-image.avif"
          rightImageAlt="Imagen de registro"
        />
      </div>
      <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8"
      />
    </main>
  )
}
