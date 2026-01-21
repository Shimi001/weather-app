import { useQuery } from "@tanstack/react-query";
import type WeatherData from "../types/weather";
import fetchWeather from "../api/weatherApi";

export const useWeather = (city: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
