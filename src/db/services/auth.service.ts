import { http } from "../../db/http";
import type {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  ApiErrorPayload,
} from "../../types/auth";
import type { IUser } from "../../types/user";
import { clearToken, saveToken } from "../../common/storage";

export function isApiValidationError(e: unknown): e is ApiErrorPayload {
  return (
    !!e &&
    typeof e === "object" &&
    ("errors" in (e as any) || "message" in (e as any))
  );
}

export const AuthService = {
  async register(payload: RegisterDTO): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>(`/register`, payload);
    saveToken(data.data.token);
    return data;
  },

  async firstUser(payload: RegisterDTO): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>(`/first-user`, payload);
    saveToken(data.data.token);
    return data;
  },

  async login(payload: LoginDTO): Promise<AuthResponse> {
    const { data } = await http.post(`/login`, payload);
    const flat = (data?.data ?? data) as AuthResponse; // aplana
    console.log(data);
    console.log(data.token);
    console.log(flat.token);

    if (!flat?.token) throw new Error("Token no recibido");
    saveToken(flat.token);
    return flat;
  },

  async profile(): Promise<IUser> {
    const { data } = await http.get<IUser>(`/profile`);
    return (data?.data ?? data) as IUser;
  },

  async logout(): Promise<void> {
    clearToken();
  },
};
