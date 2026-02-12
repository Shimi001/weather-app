import type WeatherData from "../../types/weatherApiForecast";
import { useWeatherStore } from "../../store/weatherStore";
import CurrentWeather from "./weatherComponents/CurrentWeather";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import ForecastScroll from "./weatherComponents/ForecastScroll";

interface WeatherForecastProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * WeatherForecast component
 *
 * - combines all weatherComponents into one WeatherForecast component
 *
 * @returns CurrentWeather WeatherInfo DayIndicator components
 */

function WeatherForecast({
  weatherData,
  isLoading: isApiLoading,
  error,
}: WeatherForecastProps) {
  // Get the current search query from the store
  const { searchQuery } = useWeatherStore();

  // Determine if we should show the loading state
  const showLoading = isApiLoading || !searchQuery;

  return (
    <main className="flex flex-col w-full">
      <CurrentWeather
        weatherData={weatherData ?? null}
        isLoading={showLoading}
        error={error}
      />
      <WeatherInfo
        weatherData={weatherData ?? null}
        isLoading={showLoading}
        error={error}
      />
      {isApiLoading ? (
        <h2 className="text-white/70 font-bold mb-3 animate-pulse">
          3-day forecast
        </h2>
      ) : (
        <h2 className="text-white/70 font-bold mb-3">3-day forecast</h2>
      )}
      <ForecastScroll
        weatherData={weatherData ?? null}
        isLoading={showLoading}
        error={error}
      />
    </main>
  );
}

export default WeatherForecast;
