import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export interface User {
  id: string;
  username: string;
  avatar?: string;
  role: "ADMIN" | "USER";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: "ADMIN" | "USER" | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string, role: "ADMIN" | "USER") => void;
  logout: () => void;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      avatar: string;
      created_at: string;
      updated_at: string;
      role: "ADMIN" | "USER";
    };
  };
}
