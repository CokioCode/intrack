import { fetcher } from "@/libs/fetcher";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchIndibiz = async (page: number, searchQuery: string = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    ...(searchQuery && { search: searchQuery }),
  });

  const result = await fetcher(
    `${API_URL}/indibiz?${params}`,
    { method: "GET" },
    true
  );

  return {
    data: result.data,
    hasMore: result.pagination.page < result.pagination.totalPages,
  };
};
