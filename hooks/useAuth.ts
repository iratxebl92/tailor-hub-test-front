'use client';

import { useState } from 'react';
import { authService, User } from '@/services/authService';

// Hook para login


export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<string | null> => {
    setLoading(true);
    setError(null);

    const response = await authService.login({ username, password });

    setLoading(false);

    if (response.error || !response.data?.token) {
      setError(response.error || 'Error al iniciar sesión');
      return null;
    }

    return response.data.token;
  };

  return { login, loading, error };
}

// Hook para register
export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (username: string, password: string): Promise<User | null> => {
    setLoading(true);
    setError(null);

    const response = await authService.register({ username, password });

    setLoading(false);

    if (response.error || !response.data) {
      setError(response.error || 'Error al registrar usuario');
      return null;
    }

    return {
      id: response.data.id,
      username: response.data.username,
    };
  };

  return { register, loading, error };
}
