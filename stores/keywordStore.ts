import { create } from "zustand";

interface KeywordState {
  searchQuery: string;
  setSearchQuery: (query: any) => void;
}

export const useKeywordStore = create<KeywordState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
