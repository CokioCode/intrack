import { fetchBotStats } from "@/providers/apis/bot.api";
import { useQuery } from "@tanstack/react-query";

export const useBotStatsQuery = () => {
  return useQuery({
    queryKey: ["getBotStats"],
    queryFn: fetchBotStats,
    refetchOnWindowFocus: true,
  });
};
