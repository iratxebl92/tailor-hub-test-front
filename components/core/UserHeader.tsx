"use client"

import Link from "next/link"
import { useRestaurantStore } from "@/store/store"
import { UserArrow } from "../Icons/UserArrow"

export function UserHeader() {
 const { isUserMenuOpen, setIsUserMenuOpen } = useRestaurantStore()

  return (
    <div className="flex justify-end items-center relative">
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          type="button"
          className="flex items-center gap-2 text-sm sm:text-base font-medium text-black hover:opacity-70 transition-opacity hover:cursor-pointer"
          aria-label="User menu"
          aria-expanded={isUserMenuOpen}
        >
          <span>Nombre usuario</span>
          <UserArrow />
        </button>

       
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-tailor-bg rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-2">
              <Link
                href="/profile"
                className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-xl transition-colors"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Mi cuenta
              </Link>
              <Link
                href="/restaurant/new"
                className="block px-4 py-3 text-sm text-white hover:bg-white/10 rounded-xl transition-colors"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Añadir restaurante
              </Link>
              
              <div className="my-2 border-t border-white/20 mx-4" />
              
              <div className="p-2">
                <button
                  onClick={() => {
                    //TODO: Implementar la lógica de logout
                    setIsUserMenuOpen(false)
                  }}
                  className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm hover:cursor-pointer"
                >
                  Salir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

   
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </div>
  )
}
