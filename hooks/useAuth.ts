import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/providers/apis/auth.api";
import { useAuthStore } from "@/stores/authStrore";
import { LoginInput, LoginResponse } from "@/types/authTypes";
import { showToast } from "@/utils/toast";
import { router } from "expo-router";

export const useAuth = () => {
  const {
    setAuth,
    logout: logoutStore,
    token,
    user,
    role,
    isAuthenticated,
  } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response: LoginResponse) => {
      setAuth(response.data.user, response.data.token, response.data.user.role);
      showToast.success(response.message);

      const route =
        response.data.user.role === "ADMIN" ? "/home" : "/users/home";
      router.replace(route);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login gagal. Silakan coba lagi.";
      showToast.error(errorMessage);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logoutStore();
      showToast.success("Logout berhasil!");
      router.replace("/login");
    },
    onError: (error: any) => {
      logoutStore();
      showToast.error(
        error?.message || "Logout gagal, namun sesi lokal telah dihapus."
      );
      router.replace("/login");
    },
  });

  const login = (data: LoginInput) => {
    return loginMutation.mutateAsync(data);
  };

  const logout = () => {
    return logoutMutation.mutateAsync();
  };

  return {
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    user,
    token,
    role,
    isAuthenticated,
  };
};
