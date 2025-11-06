import { fetcher } from "@/libs/fetcher";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchBotStats = async (): Promise<{
  data: {
    total: number;
    keywords: number;
    infoCenter: number;
  };
}> => {
  const result = await fetcher(
    `${API_BASE_URL}/bot/stats`,
    {
      method: "GET",
    },
    true
  );

  return result;
};
