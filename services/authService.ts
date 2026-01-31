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
};
