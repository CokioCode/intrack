import { fetcher } from "@/libs/fetcher";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchInformation = async (
  page: number,
  searchQuery: string = "",
  itemsPerPage: number = 5,
  filterCategory: "PROMO" | "PAKET" | "INFO" | "" = ""
) => {
  if (page < 1) {
    throw new Error("Page number must be at least 1");
  }

  const params = new URLSearchParams({
    page: page.toString(),
    limit: itemsPerPage.toString(),
    category: filterCategory,
  });

  if (searchQuery.trim()) {
    params.append("search", searchQuery.trim());
  }

  try {
    const result = await fetcher(
      `${API_URL}/custom-bot?${params.toString()}`,
      { method: "GET" },
      true
    );

    if (!result || typeof result !== "object") {
      throw new Error("Invalid response format");
    }

    return {
      data: Array.isArray(result.data) ? result.data : [],
      currentPage: result.pagination?.page ?? page,
      totalPages: result.pagination?.totalPages ?? 1,
      totalItems:
        result.pagination?.totalItems ??
        (Array.isArray(result.data) ? result.data.length : 0),
      itemsPerPage,
    };
  } catch (error) {
    console.error("Error fetching information:", error);
    throw error;
  }
};

export const fetchInformationList = async () => {
  const result = await fetcher(
    `${API_URL}/custom-bot/list`,
    { method: "GET" },
    true
  );

  return result.data;
};

export const fetchInformationPost = async (
  data: FormData
): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/custom-bot`,
    { method: "POST", body: data },
    true,
    true
  );

  return result.data;
};

export const fetchInformationPut = async (
  id: string,
  data: FormData
): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/custom-bot/${id}`,
    { method: "PUT", body: data },
    true,
    true
  );

  return result.data;
};

export const fetchInformationDelete = async (id: string): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/custom-bot/${id}`,
    { method: "DELETE" },
    true
  );

  return result;
};
