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
  let currentDayIndex: number;

  if (forecastDay) {
    const dateObj = new Date(forecastDay.date);
    currentDayIndex = dateObj.getDay();
  } else {
    currentDayIndex = new Date().getDay();
  }

  const dayStyle = days[currentDayIndex];

  return dayStyle;
};
