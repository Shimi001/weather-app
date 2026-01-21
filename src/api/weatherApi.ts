import type WeatherData from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

const fetchWeather = async (city: string): Promise<WeatherData> => {
  if (!API_KEY || !BASE_URL) {
    throw new Error("Missing Weather API Configuration");
  }

  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=no`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json() as Promise<WeatherData>;
};

export default fetchWeather;
