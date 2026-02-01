"use client"

import { useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRestaurants } from "@/hooks/useRestaurants"
import { useRestaurantUIStore } from "@/store/restaurantStore"

mapboxgl.accessToken = "pk.eyJ1IjoiaXJhdHhlYmwiLCJhIjoiY21remw0ZWMzMDMxajNkc2RtMTlvcTk2diJ9.v6HQuQPUiCMBKjjGe8prxQ"



function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([]) // Lista simple de marcadores

  const { restaurants } = useRestaurants()
  const { selectedRestaurantId, setSelectedRestaurantId } = useRestaurantUIStore()

  // 1. CREAR EL MAPA (Solo se ejecuta una vez al cargar)
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.98, 40.72],
      zoom: 12,
    })

    return () => map.current?.remove()
  }, [])

  // 2. DIBUJAR MARCADORES (Se ejecuta cuando cambian los restaurantes o el seleccionado)
  useEffect(() => {
    if (!map.current) return

    // Paso A: Borrar marcadores viejos para no amontonarlos
    markers.current.forEach(m => m.remove())
    markers.current = []

    // Paso B: Crear los nuevos
    restaurants.forEach((res) => {
      if (!res.latlng) return

      const isSelected = res.id === selectedRestaurantId
      
      const marker = new mapboxgl.Marker({ 
        color: isSelected ? "#264BEB" : "#8DA0F0" 
      })
        .setLngLat([res.latlng.lng, res.latlng.lat])
        .addTo(map.current!)

      // Al hacer clic, avisamos a la tienda (store)
      marker.getElement().onclick = () => setSelectedRestaurantId(res.id)

      // Guardamos el marcador para poder borrarlo luego
      markers.current.push(marker)
    })
  }, [restaurants, selectedRestaurantId])

  return <div ref={mapContainer} className="w-full h-full min-h-[400px]" />
}

// Exportación especial para que Next.js no falle con Mapbox
export const MapContainer = dynamic(() => Promise.resolve(Map), { ssr: false })