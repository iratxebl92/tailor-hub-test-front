"use client"

import Image from "next/image"

export function ProfileCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm overflow-hidden">
  
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-gray-100">
        <Image 
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop" 
          alt="Foto de perfil"
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        
        
        <div className="absolute inset-x-0 bottom-0  from-black/80 to-transparent p-8 pt-20 text-white">
          <h2 className="text-3xl font-bold mb-1">Nombre usuario</h2>
          <p className="text-white/70 text-base">usuario@tailorhub.es</p>
          
          <div className="mt-4 inline-flex px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest rounded-full">
            Usuario Premium
          </div>
        </div>
      </div>
    </div>
  )
}
