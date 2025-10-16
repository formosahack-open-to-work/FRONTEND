import { http } from "../../db/http";
import type {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  ApiErrorPayload,
} from "../../types/auth";
import type { IUser } from "../../types/user";
import { saveToken } from "../../common/storage";

const AUTH_PREFIX = "/auth";

export function isApiValidationError(e: unknown): e is ApiErrorPayload {
  return (
    !!e &&
    typeof e === "object" &&
    ("errors" in (e as any) || "message" in (e as any))
  );
}

export const AuthService = {
  async register(payload: RegisterDTO): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>(
      `${AUTH_PREFIX}/register`,
      payload
    );
    saveToken(data.token);
    return data;
  },

  async firstUser(payload: RegisterDTO): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>(
      `${AUTH_PREFIX}/first-user`,
      payload
    );
    saveToken(data.token);
    return data;
  },

  async login(payload: LoginDTO): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>(
      `${AUTH_PREFIX}/login`,
      payload
    );
    saveToken(data.token);
    return data;
  },

  async profile(): Promise<IUser> {
    const { data } = await http.get<IUser>(`${AUTH_PREFIX}/profile`);
    return data;
  },
};
