"use client"

type NewRestaurantFormProps = {
  onSave: () => void
}

export function NewRestaurantForm({ onSave }: NewRestaurantFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del restaurante"
            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Dirección
          </label>
          <input
            id="address"
            type="text"
            placeholder="Dirección del restaurante"
            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Describe el restaurante..."
            className="w-full min-h-[120px] px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onSave}
          className="w-fit px-12 py-3 bg-white border border-black rounded-full text-sm font-bold hover:bg-black hover:text-white transition-all transform active:scale-95 shadow-sm"
        >
          Guardar
        </button>
      </div>
    </div>
  )
}
