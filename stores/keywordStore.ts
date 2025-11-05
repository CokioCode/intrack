import { create } from "zustand";

interface KeywordState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useKeywordStore = create<KeywordState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
