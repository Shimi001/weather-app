import { create } from "zustand";

// Define the shape of the weather state
interface WeatherState {
  dayOffset: number;
  incrementDay: () => void;
  decrementDay: () => void;
  setDayOffset: (offset: number) => void;
}

/**
 * Zustand store for managing weather day offset state
 */

export const useWeatherStore = create<WeatherState>((set) => ({
  // Initial day offset
  dayOffset: 0,

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
}));
