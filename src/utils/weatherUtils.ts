import type WeatherData from "../types/weatherApiForecast";

interface DayStyle {
  name: string;
  symbol: string;
  color: string;
}

/**
 * Get the current day index from API data or system date
 *
 * @param forecastDay the forecast data object
 * @returns a number from 0-6 representing the day of the week
 */

export const getCurrentDayIndex = (
  forecastDay: WeatherData["forecast"]["forecastday"][0] | undefined,
) => {
  let currentDayIndex: number;

  // if forecastDay is provided, extract the day index from its date
  if (forecastDay) {
    const dateObj = new Date(forecastDay.date);
    currentDayIndex = dateObj.getDay();
  } else {
    currentDayIndex = new Date().getDay();
  }

  return currentDayIndex;
};

/**
 * Get the style for the current day
 *
 * @param forecastDay the forecast data object
 * @param days array of available style configurations.
 * @returns the style object for the current day
 */

export const getDayStyle = (
  forecastDay: WeatherData["forecast"]["forecastday"][0] | undefined,
  days: DayStyle[],
) => {
  const currentDayIndex = getCurrentDayIndex(forecastDay);
  const dayStyle = days[currentDayIndex];

  return dayStyle;
};
