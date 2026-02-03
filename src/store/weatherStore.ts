import { create } from "zustand";

// Define the shape of the weather state
interface WeatherState {
  dayOffset: number;
  searchQuery: string | null;
  isManualSearch: boolean;

  incrementDay: () => void;
  decrementDay: () => void;
  setDayOffset: (offset: number) => void;

  setSearchQuery: (query: string, isManual?: boolean) => void;
}

/**
 * Zustand store for managing weather day offset state and search query
 *
 * - `dayOffset` - used to navigate between forecast days
 * - `searchQuery` - stores the selected city name and manual search status
 * - `isManualSearch` - stores the manual search status
 */

export const useWeatherStore = create<WeatherState>((set) => ({
  dayOffset: 0,
  searchQuery: null,
  isManualSearch: false,

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

  // Function to set the searchQuery and isManualSearch
  setSearchQuery: (query, isManual = false) =>
    set({ searchQuery: query, isManualSearch: isManual }),
}));
