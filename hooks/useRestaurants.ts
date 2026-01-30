'use client';

import { useState, useEffect } from 'react';
import { restaurantService } from '@/services/restaurantService';
import type { Restaurant } from '@/domain/types';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await restaurantService.getAll();
        setRestaurants(response.data || []);
      } catch (err) {
        setError('Error al cargar los restaurantes');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
}


export function useRestaurant(id: number | string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await restaurantService.get(id);
        setRestaurant(response.data || null);
      } catch (err) {
        setError('Error al cargar el restaurante');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return { restaurant, loading, error };
}


// Hook para crear un nuevo restaurante
export function useCreateRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para crear el restaurante
  const createRestaurant = async (restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant | null> => {
    setLoading(true);
    setError(null);

    const response = await restaurantService.create(restaurant);

    setLoading(false);

    if (response.error) {
      setError(response.error);
      return null;
    }

    return response.data;
  };

  return { createRestaurant, loading, error };
}
