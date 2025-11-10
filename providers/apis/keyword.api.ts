import { fetcher } from "@/libs/fetcher";
import { KeywordTypes } from "@/types/keywordTypes";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchKeyword = async (
  page: number = 1,
  searchQuery: string = "",
  itemsPerPage: number = 5
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: itemsPerPage.toString(),
    ...(searchQuery && { search: searchQuery }),
  });

  const result = await fetcher(
    `${API_URL}/bot/keywords?${params}`,
    { method: "GET" },
    true
  );

  return {
    data: result.data || [],
    currentPage: result.pagination?.page || page,
    totalPages: result.pagination?.totalPages || 1,
    totalItems: result.pagination?.totalItems || result.data?.length || 0,
    itemsPerPage,
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
