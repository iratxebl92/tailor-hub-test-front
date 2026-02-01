'use client';

import { useState, useEffect } from 'react';
import { restaurantService } from '@/services/restaurantService';
import { useUserStore } from '@/store/userStore';
import type { Restaurant } from '@/domain/types';

// Obtener restaurantes del usuario
export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useUserStore(state => state.token);
  const logout = useUserStore(state => state.logout);
  const loadFromLocalStorage = useUserStore(state => state.loadFromLocalStorage);

  // Primero: sincronizar con localStorage cuando el componente se monta
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Segundo: cargar restaurantes cuando hay token
  useEffect(() => {
    // Si no hay token, esperar (puede que aún no se haya cargado de localStorage)
    if (!token) {
      // No hacer nada, esperar a que loadFromLocalStorage actualice el token
      return;
    }

    // Cargar restaurantes
    setLoading(true);
    setError(null);
    
    console.log("useRestaurants - Haciendo request con token:", token)
    
    restaurantService.getAll({ headers: { Authorization: token } })
      .then(res => {
        console.log("useRestaurants - Respuesta:", res)
        
        if (res.error) {
          console.log("useRestaurants - Error del servidor:", res.error, "status:", res.status)
          // TEMPORALMENTE DESHABILITADO: No hacer logout automático
          // if (res.status === 401 || res.error.includes('Unauthorized')) {
          //   logout();
          //   return;
          // }
          setError(res.error);
          setRestaurants([]);
        } else {
          setRestaurants(res.data || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar restaurantes');
        setLoading(false);
      });
  }, [token, logout]);

  return { restaurants, loading, error };
}

// Obtener un restaurante
export function useRestaurant(id: number | string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useUserStore(state => state.token);

  useEffect(() => {
    if (!id || !token) {
      setLoading(false);
      return;
    }

    restaurantService.get(id, { headers: { Authorization: token } })
      .then(res => {
        setRestaurant(res.data);
        setLoading(false);
      });
  }, [id, token]);

  return { restaurant, loading, error };
}

// Crear restaurante
export function useCreateRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useUserStore(state => state.token);

  const createRestaurant = async (data: Omit<Restaurant, 'id'>) => {
    if (!token) return null;

    setLoading(true);
    const res = await restaurantService.create(data, { headers: { Authorization: token } });
    setLoading(false);

    return res.data;
  };

  return { createRestaurant, loading, error };
}

// Actualizar restaurante
export function useUpdateRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useUserStore(state => state.token);

  const updateRestaurant = async (id: number | string, data: Omit<Restaurant, 'id'>) => {
    if (!token) return null;
    
    setLoading(true);
    const res = await restaurantService.update(id, data, { headers: { Authorization: token } });
    setLoading(false);
    return res.data;
  };

  return { updateRestaurant, loading, error };
}

// Eliminar restaurante
export function useDeleteRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useUserStore(state => state.token);

  const deleteRestaurant = async (id: number | string) => {
    if (!token) return false;
    
    setLoading(true);
    const res = await restaurantService.delete(id, { headers: { Authorization: token } });
    setLoading(false);
    return !res.error;
  };

  return { deleteRestaurant, loading, error };
}
