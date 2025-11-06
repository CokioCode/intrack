import { fetcher } from "@/libs/fetcher";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchInformation = async (
  page: number,
  searchQuery: string = ""
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    ...(searchQuery && { search: searchQuery }),
  });

  const result = await fetcher(
    `${API_URL}/custom-bot?${params}`,
    { method: "GET" },
    true
  );

  return {
    data: result.data,
    hasMore: result.pagination.page < result.pagination.totalPages,
  };
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
