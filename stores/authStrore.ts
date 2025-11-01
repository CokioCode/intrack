import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "@/types/authTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,

      setAuth: (user, token, role) =>
        set(() => ({
          user,
          token,
          role,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
