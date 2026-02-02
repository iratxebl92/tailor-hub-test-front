import { api, ApiResponse, RequestOptions } from './api';
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  RegisterResponse, 
  ValidateResponse 
} from '@/domain/users.type';

const AUTH_ENDPOINT = '/auth';

export const authService = {

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
