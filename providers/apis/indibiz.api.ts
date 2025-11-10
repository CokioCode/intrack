import { fetcher } from "@/libs/fetcher";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchIndibiz = async (
  page: number = 1,
  searchQuery: string = "",
  itemsPerPage: number = 5,
  filterStatus:
    | "PS"
    | "CANCEL"
    | "KENDALA"
    | "REVOKE"
    | "QC1"
    | "PI"
    | "FALLOUT"
    | "WFM_UNSC"
    | "QC2_FCC"
    | "PAPERLESS"
    | "SURVER"
    | "DECLINE_FCC"
    | "PT3_WAITING_AKTIVASI"
    | "FOLLOWUP_TO_COMPLETE"
    | "" = ""
): Promise<any> => {
  if (page < 1) {
    throw new Error("Page number must be at least 1");
  }

  const params = new URLSearchParams({
    page: page.toString(),
    limit: itemsPerPage.toString(),
    status: filterStatus,
  });

  if (searchQuery.trim()) {
    params.append("search", searchQuery.trim());
  }

  try {
    const result = await fetcher(
      `${API_URL}/indibiz?${params.toString()}`,
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

export const syncIndibiz = async (data: any): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/indibiz/sync`,
    { method: "POST", body: JSON.stringify(data) },
    true
  );

  return result.data;
};
