import { api, ApiResponse, RequestOptions } from './api';

// Types
export interface User {
  id: number
  username: string
  email?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user?: User
}

export interface RegisterResponse {
  id: number
  username: string
}

// Respuesta del endpoint de validación
export interface ValidateResponse {
  valid: boolean
  user?: {
    id: number
    username: string
  }
}

const AUTH_ENDPOINT = '/auth';

export const authService = {
  // POST /auth/login
  async login(
    credentials: LoginRequest, 
    options?: RequestOptions
  ): Promise<ApiResponse<LoginResponse>> {
    return api.post<LoginResponse, LoginRequest>(
      `${AUTH_ENDPOINT}/login`, 
      credentials, 
      options
    );
  },

  // POST /auth/register
  async register(
    userData: RegisterRequest, 
    options?: RequestOptions
  ): Promise<ApiResponse<RegisterResponse>> {
    return api.post<RegisterResponse, RegisterRequest>(
      `${AUTH_ENDPOINT}/register`, 
      userData, 
      options
    );
  },

  // POST /auth/validate
  // Verifica si un token es válido (si el usuario existe en el servidor)
  // Útil para cuando el servidor se reinicia y las cookies del navegador siguen existiendo
  async validateToken(
    token: string,
    options?: RequestOptions
  ): Promise<ApiResponse<ValidateResponse>> {
    return api.post<ValidateResponse, { token: string }>(
      `${AUTH_ENDPOINT}/validate`,
      { token },
      options
    );
  },
};
