import { create } from "zustand";

interface WeatherState {
  dayOffset: number;
  incrementDay: () => void;
  decrementDay: () => void;
  setDayOffset: (offset: number) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  dayOffset: 0,

  incrementDay: () =>
    set((state) => ({
      dayOffset: state.dayOffset < 2 ? state.dayOffset + 1 : state.dayOffset,
    })),
  decrementDay: () =>
    set((state) => ({
      dayOffset: state.dayOffset > 0 ? state.dayOffset - 1 : state.dayOffset,
    })),

  setDayOffset: (offset) => set({ dayOffset: offset }),
}));
