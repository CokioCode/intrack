import { fetcher } from "@/libs/fetcher";
import { LoginInput, LoginResponse } from "@/types/authTypes";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export const authApi = {
  login: async (data: LoginInput): Promise<LoginResponse> => {
    return fetcher(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<void> => {
    return fetcher(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });
  },
} as const;
