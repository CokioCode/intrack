import { create } from "zustand";

interface OrdersState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
