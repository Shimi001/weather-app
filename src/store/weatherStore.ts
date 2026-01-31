import { create } from "zustand";

// Define the shape of the weather state
interface WeatherState {
  dayOffset: number;
  searchQuery: string | null;

  incrementDay: () => void;
  decrementDay: () => void;
  setDayOffset: (offset: number) => void;

  setSearchQuery: (query: string) => void;
}

/**
 * Zustand store for managing weather day offset state and search query
 */

export const useWeatherStore = create<WeatherState>((set) => ({
  // Initial day offset
  dayOffset: 0,

  // Initial search query
  searchQuery: null,

  // Function to increment the day offset (max 3 days forecast)
  incrementDay: () =>
    set((state) => ({
      dayOffset: state.dayOffset < 2 ? state.dayOffset + 1 : state.dayOffset,
    })),

  // Function to decrement the day offset
  decrementDay: () =>
    set((state) => ({
      dayOffset: state.dayOffset > 0 ? state.dayOffset - 1 : state.dayOffset,
    })),

  // Function to set the day offset directly
  setDayOffset: (offset) => set({ dayOffset: offset }),

  // Function to set the search query
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
