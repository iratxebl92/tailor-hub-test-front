"use client"

type RestaurantHeroProps = {
  name: string
  address: string
  image: string
}

export function RestaurantHero({ name, address, image }: RestaurantHeroProps) {
  return (
    <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg">

      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2">
            {name}
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-90 text-center">
            {address}
          </p>
        </div>
      </div>
    </div>
  )
}
