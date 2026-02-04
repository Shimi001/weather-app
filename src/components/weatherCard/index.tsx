import type WeatherData from "../../types/weatherApiForecast";
import WeatherCircle from "./weatherComponents/WeatherCircle";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import DayIndicator from "./weatherComponents/DayIndicator";
import { useWeatherStore } from "../../store/weatherStore";

interface WeatherCardProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * WeatherCard component
 *
 * - combines all weatherComponents into one WeatherCard component
 *
 * @returns WeatherCircle WeatherInfo DayIndicator components
 */

function WeatherCard({
  weatherData,
  isLoading: isApiLoading,
  error,
}: WeatherCardProps) {
  // Get the current search query from the store
  const { searchQuery } = useWeatherStore();

  // Determine if we should show the loading state
  const showLoading = isApiLoading || !searchQuery;

  return (
    <div className="flex flex-col gap-12 w-full">
      <WeatherCircle
        weatherData={weatherData ?? null}
        isLoading={showLoading}
        error={error}
      />
      <WeatherInfo
        weatherData={weatherData ?? null}
        isLoading={showLoading}
        error={error}
      />
      <DayIndicator
        weatherData={weatherData ?? null}
        isLoading={showLoading}
        error={error}
      />
    </div>
  );
}

export default WeatherCard;
