import { fetcher } from "@/libs/fetcher";
import { KeywordTypes } from "@/types/keywordTypes";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchKeyword = async (page: number, searchQuery: string = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  });

  // Only add search parameter if there's a search query
  if (searchQuery && searchQuery.trim() !== "") {
    params.append("search", searchQuery.trim());
  }

  const result = await fetcher(
    `${API_URL}/bot/keywords?${params}`,
    { method: "GET" },
    true
  );

  return {
    data: result.data || [],
    hasMore: result.pagination?.page < result.pagination?.totalPages,
  };
};

export const fetchKeywordPost = async (
  data: KeywordTypes
): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/bot/keywords`,
    { method: "POST", body: JSON.stringify(data) },
    true
  );

  return result.data;
};

export const fetchKeywordPut = async (
  id: string,
  data: KeywordTypes
): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/bot/keywords/${id}`,
    { method: "PUT", body: JSON.stringify(data) },
    true
  );

  return result.data;
};

export const fetchKeywordDelete = async (id: string): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/bot/keywords/${id}`,
    { method: "DELETE" },
    true
  );

  return result.data;
};
