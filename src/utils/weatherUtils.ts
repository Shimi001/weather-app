import type WeatherData from "../types/weather";

interface DayStyle {
  name: string;
  symbol: string;
  color: string;
}

export const getDayStyle = (
  forecastDay: WeatherData["forecast"]["forecastday"][0] | undefined,
  days: DayStyle[],
) => {
  const currentDayIndex = getCurrentDayIndex(forecastDay);

  const dayStyle = days[currentDayIndex];

  return dayStyle;
};

export const getCurrentDayIndex = (
  forecastDay: WeatherData["forecast"]["forecastday"][0] | undefined,
) => {
  let currentDayIndex: number;

  if (forecastDay) {
    const dateObj = new Date(forecastDay.date);
    currentDayIndex = dateObj.getDay();
  } else {
    currentDayIndex = new Date().getDay();
  }

  return currentDayIndex;
};
