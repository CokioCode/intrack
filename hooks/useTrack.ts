import {
  fetchTrackAoNumber,
  fetchTrackStats,
} from "@/providers/apis/track.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/utils/toast";

export const useTrackAoNumberQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["getTrack"],
    mutationFn: (ao_number: string) => fetchTrackAoNumber(ao_number),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      showToast.success(data.message || "Track get successfully.");
    },
    onError: (err) => {
      showToast.error(err.message || "Failed to get track.");
    },
  });
};

export const useTrackStatsQuery = () => {
  return useQuery({
    queryKey: ["getTrackStats"],
    queryFn: fetchTrackStats,
    refetchOnWindowFocus: true,
  });
};
