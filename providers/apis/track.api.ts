import { fetcher } from "@/libs/fetcher";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchTrackAoNumber = async (
  ao_number: string
): Promise<unknown> => {
  const result = await fetcher(
    `${API_BASE_URL}/tracking/${ao_number}/latest`,
    { method: "GET" },
    true
  );

  return result;
};

export const fetchTrackStats = async (): Promise<{
  data: {
    byStatus: { pending: number; success: number };
    total: number;
  };
}> => {
  const result = await fetcher(
    `${API_BASE_URL}/tracking/stats`,
    {
      method: "GET",
    },
    true
  );

  return result;
};
