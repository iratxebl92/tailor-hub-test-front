// User base type
export interface User {
  id: number;
  username: string;
  email?: string;
}

// Auth request types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

// Auth response types
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

// Register form type
export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}
