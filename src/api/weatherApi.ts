import type WeatherData from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

export interface SearchCity {
  id: number;
  name: string;
  region: string;
  country: string;
  url: string;
}

/**
 * weatherApi API key fetch function
 *
 * @param city the name of the city to fetch weather for
 * @returns strictly typed WeatherData object
 */

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  // Validate API key and base URL
  if (!API_KEY || !BASE_URL) {
    throw new Error("Missing Weather API Configuration");
  }

  // Fetch weather data from the API
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=no`,
  );

  // Handle non-OK responses
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  // Parse and return the JSON response as WeatherData
  return response.json() as Promise<WeatherData>;
};

/**
 *
 * @param query
 * @returns
 */

export const searchCities = async (query: string): Promise<SearchCity[]> => {
  if (!query || query.length < 3) return [];

  const response = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};
