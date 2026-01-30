"use client"

import Image from "next/image"

type ImageUploaderProps = {
  image: string | null
  onImageUpload: (image: string) => void
  onImageRemove: () => void
}

export function ImageUploader({ image, onImageUpload, onImageRemove }: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageUpload(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      {!image ? (
        <label className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-dashed border-gray-300 rounded-3xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm text-gray-500 font-medium">Añadir imagen</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden group shadow-md">
          <Image src={image} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={onImageRemove}
              className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
            >
              Eliminar imagen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
