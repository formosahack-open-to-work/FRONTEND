import type { IUser } from "./user";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

// Formato típico de express-validator + capa de errores propia
export interface ApiValidationError {
  msg: string;
  param: string;
}

export interface ApiErrorPayload {
  message?: string;
  errors?: ApiValidationError[];
}
