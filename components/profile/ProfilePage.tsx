"use client"

import { UserHeader } from "@/components/core/UserHeader"
import { ProfileCard } from "./ProfileCard"
import { Footer } from "../core/Footer"

export function ProfilePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
    
      <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <UserHeader />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8">
            Mi cuenta
          </h1>
          
          <ProfileCard />
        </div>
      </div>

      <Footer className="pb-2 pl-4 sm:pl-6 md:pl-8" />
    </main>
  )
}
