import { create } from "zustand";

interface IndibizState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useIndibizStore = create<IndibizState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
