import { create } from "zustand";

interface InformationState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useInformationStore = create<InformationState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
