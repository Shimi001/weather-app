import { useQuery } from "@tanstack/react-query";
import type WeatherData from "../types/weatherApiForecast";
import { fetchWeather } from "../api/weatherApi";

/**
 * useWeather custom hook to fetch weather data
 *
 * @param city the name of the city to fetch weather for
 * @returns data, error, and loading states
 */

export const useWeather = (city: string) => {
  return useQuery<WeatherData, Error>({
    // Unique key for caching
    queryKey: ["weather", city],

    // The actual promise-returning function that fetches data
    queryFn: () => fetchWeather(city),

    // Enable the query only if a city is provided
    enabled: !!city,

    // Data lifetime
    staleTime: 1000 * 60 * 5,

    // Disable automatic retries on failure
    retry: false,
  });
};
