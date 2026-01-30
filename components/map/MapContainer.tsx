"use client"

import { useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useRestaurants } from "@/hooks/useRestaurants"
import { useRestaurantStore } from "@/store/store"

mapboxgl.accessToken = "pk.eyJ1IjoiaXJhdHhlYmwiLCJhIjoiY21remw0ZWMzMDMxajNkc2RtMTlvcTk2diJ9.v6HQuQPUiCMBKjjGe8prxQ"

const COLOR_SELECTED = "#264BEB"
const COLOR_DEFAULT = "#8DA0F0"

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])

  const { restaurants } = useRestaurants()
  const {selectedRestaurantId, setSelectedRestaurantId} = useRestaurantStore()


  // Inicializar mapa
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      center: [-73.98, 40.72],
      zoom: 12,
    })
    return () => { map.current?.remove() }
  }, [])

  // Crear marcadores
  useEffect(() => {
    if (!map.current || restaurants.length === 0) return
    if (selectedRestaurantId === null) setSelectedRestaurantId(restaurants[0].id)

    markers.current.forEach((m) => m.remove())
    markers.current = restaurants.map((r) => {
      const marker = new mapboxgl.Marker({ 
        color: r.id === selectedRestaurantId ? COLOR_SELECTED : COLOR_DEFAULT 
      })
        .setLngLat([r.latlng.lng, r.latlng.lat])
        .addTo(map.current!)
      
      marker.getElement().onclick = () => setSelectedRestaurantId(r.id)
      return marker
    })
  }, [restaurants, selectedRestaurantId, setSelectedRestaurantId])

  // Actualizar colores
  useEffect(() => {
    markers.current.forEach((marker, i) => {
      const svg = marker.getElement().querySelector("svg")
      if (svg) svg.style.fill = restaurants[i]?.id === selectedRestaurantId ? COLOR_SELECTED : COLOR_DEFAULT
    })
  }, [selectedRestaurantId, restaurants])

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />
}

export const MapContainer = dynamic(() => Promise.resolve(Map), { ssr: false })
