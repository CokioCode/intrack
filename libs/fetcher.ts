import { useAuthStore } from "@/stores/authStrore";

export const fetcher = async (
  url: string,
  options?: RequestInit,
  isAuth?: boolean,
  isFormData?: boolean
): Promise<any> => {
  try {
    const headers = new Headers(options?.headers);
    if (!isFormData) {
      headers.set("Content-Type", "application/json");
    }

    if (isAuth) {
      const token = useAuthStore.getState().token;
      if (!token) {
        throw new Error("No token found");
      }
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      useAuthStore.getState().logout();
      throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (e) {}

      throw new Error(
        errorData.message ||
          errorData.error ||
          `HTTP Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (__DEV__) {
      console.error("Fetcher error:", error);
    }
    throw error;
  }
};
