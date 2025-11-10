import { fetcher } from "@/libs/fetcher";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const fetchOrders = async (
  page: number = 1,
  searchQuery: string = "",
  itemsPerPage: number = 5,
  filterStatus: "RNA" | "QC" | "FCC" | "PI" | "PS" | "" = "",
  filterMonth:
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december"
    | "" = ""
): Promise<any> => {
  if (page < 1) {
    throw new Error("Page number must be at least 1");
  }

  const params = new URLSearchParams({
    page: page.toString(),
    limit: itemsPerPage.toString(),
    status: filterStatus,
    month: filterMonth,
  });

  if (searchQuery.trim()) {
    params.append("search", searchQuery.trim());
  }

  try {
    const result = await fetcher(
      `${API_URL}/tracking?${params.toString()}`,
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

export const updateOrderStatus = async (
  orderId: string,
  data: any
): Promise<unknown> => {
  const result = await fetcher(
    `${API_URL}/tracking/${orderId}`,
    { method: "PUT", body: JSON.stringify(data) },
    true
  );

  return result.data;
};
