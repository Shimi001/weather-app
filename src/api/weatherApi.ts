import type WeatherData from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

/**
 * weatherApi API key fetch function
 * 
 * @param city the name of the city to fetch weather for
 * @returns strictly typed WeatherData object
 */

const fetchWeather = async (city: string): Promise<WeatherData> => {
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

export default fetchWeather;
