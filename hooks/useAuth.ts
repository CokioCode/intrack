import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/providers/apis/auth.api";
import { useAuthStore } from "@/stores/authStrore";
import { LoginInput, LoginResponse } from "@/types/authTypes";
import { showToast } from "@/utils/toast";

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
      showToast.success("Login berhasil!");
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.message || "Login gagal. Silakan coba lagi."
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logoutStore();
      showToast.success("Logout berhasil!");
    },
    onError: (error: any) => {
      console.error("Logout API failed:", error);
      logoutStore();
      showToast.error("Logout gagal, namun sesi lokal telah dihapus.");
    },
  });

  const login = async (data: LoginInput) => {
    return loginMutation.mutateAsync(data);
  };

  const logout = async () => {
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
