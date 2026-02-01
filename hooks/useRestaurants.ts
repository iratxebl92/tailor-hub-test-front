'use client';

import { useState, useEffect } from 'react';
import { restaurantService, CreateReviewData } from '@/services/restaurantService';
import { useAuthStore } from '@/store/authStore';
import type { Restaurant } from '@/domain/restaurants.type';

// Obtener restaurantes del usuario
export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const validateAndLoadToken = useAuthStore(state => state.validateAndLoadToken);

  // Primero: validar token con el servidor cuando el componente se monta
  useEffect(() => {
    validateAndLoadToken();
  }, [validateAndLoadToken]);

  // Segundo: cargar restaurantes cuando hay token
  useEffect(() => {
    // Si no hay token, esperar (puede que aún no se haya validado)
    if (!token) {
      return;
    }

    // Cargar restaurantes
    setLoading(true);
    setError(null);
    
    restaurantService.getAll({ headers: { Authorization: token } })
      .then(res => {
        if (res.error) {
          // Si el servidor devuelve 401, el token ya no es válido
          // Esto pasa si el servidor se reinició
          if (res.status === 401 || res.error.includes('Unauthorized')) {
            logout();
            return;
          }
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
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const validateAndLoadToken = useAuthStore(state => state.validateAndLoadToken);

  // Primero: validar token con el servidor cuando el componente se monta
  useEffect(() => {
    validateAndLoadToken();
  }, [validateAndLoadToken]);

  // Función para cargar el restaurante
  const fetchRestaurant = async () => {
    if (!id || !token) {
      return;
    }

    setLoading(true);
    const res = await restaurantService.get(id, { headers: { Authorization: token } });
    
    // Si el servidor devuelve error 401, cerrar sesión
    if (res.status === 401) {
      logout();
      return;
    }
    
    setRestaurant(res.data);
    setLoading(false);
  };

  // Cargar al montar o cuando cambia id/token
  useEffect(() => {
    if (!token) {
      return;
    }
    fetchRestaurant();
  }, [id, token]);

  return { restaurant, loading, error, refetch: fetchRestaurant };
}

// Crear restaurante
export function useCreateRestaurant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore(state => state.token);

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
  const token = useAuthStore(state => state.token);

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
  const token = useAuthStore(state => state.token);

  const deleteRestaurant = async (id: number | string) => {
    if (!token) return false;
    
    setLoading(true);
    const res = await restaurantService.delete(id, { headers: { Authorization: token } });
    setLoading(false);
    return !res.error;
  };

  return { deleteRestaurant, loading, error };
}

// Añadir review a un restaurante
export function useAddReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore(state => state.token);

  const addReview = async (restaurantId: number | string, review: CreateReviewData) => {
    if (!token) return null;
    
    setLoading(true);
    setError(null);
    
    const res = await restaurantService.addReview(restaurantId, review, { headers: { Authorization: token } });
    
    setLoading(false);
    
    if (res.error) {
      setError(res.error);
      return null;
    }
    
    return res.data;
  };

  return { addReview, loading, error };
}
