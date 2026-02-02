export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface RegisterResponse {
  id: number;
  username: string;
}

export interface ValidateResponse {
  valid: boolean;
  user?: {
    id: number;
    username: string;
  };
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}
