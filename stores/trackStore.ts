import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface OrderStep {
  step: number;
  code: string;
  subtitle: string;
  description: string;
  is_completed: boolean;
  has_update: boolean;
  update_details: string | null;
  is_current: boolean;
}

export interface IndibizInfo {
  ao_number: string;
  description: string;
  id: string;
  name: string;
  pic_name: string;
  status: string;
}

export interface Order {
  id: string;
  current_status: string;
  from_status: string;
  to_status: string;
  has_update: boolean;
  indibiz_id: string;
  indibiz: IndibizInfo;
  remarks: string;
  update_details: string;
  steps: OrderStep[];
  lastUpdated?: string;
  created_at?: string;
  daysElapsed?: number;
}

interface OrderState {
  recentSearches: string[];
  trackedOrders: Record<string, Order>;
  originalOrders: Record<string, Order>;

  addRecentSearch: (scNumber: string) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (scNumber: string) => void;

  setTrackedOrder: (order: Order) => void;
  getTrackedOrder: (scNumber: string) => Order | null;
  clearTrackedOrders: () => void;

  setOrders: (orders: Order[]) => void;
  resetOrders: () => void;
}

export const useTrackStore = create<OrderState>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      trackedOrders: {},
      originalOrders: {},

      addRecentSearch: (scNumber) => {
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== scNumber);
          return { recentSearches: [scNumber, ...filtered].slice(0, 10) };
        });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      removeRecentSearch: (scNumber) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s !== scNumber),
        })),

      setTrackedOrder: (order) =>
        set((state) => ({
          trackedOrders: {
            ...state.trackedOrders,
            [order.id]: { ...order, lastUpdated: new Date().toISOString() },
          },
        })),

      getTrackedOrder: (orderId) => get().trackedOrders[orderId] || null,

      clearTrackedOrders: () => set({ trackedOrders: {} }),

      setOrders: (orders) =>
        set((state) => ({
          originalOrders:
            Object.keys(state.originalOrders).length === 0
              ? state.trackedOrders
              : state.originalOrders,
          trackedOrders: Object.fromEntries(orders.map((o) => [o.id, o])),
        })),

      resetOrders: () =>
        set((state) => ({
          trackedOrders: state.originalOrders,
          originalOrders: {},
        })),
    }),
    {
      name: "track-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
