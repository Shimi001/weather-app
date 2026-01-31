import WeatherCircle from "./weatherComponents/WeatherCircle";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import DayIndicator from "./weatherComponents/DayIndicator";
import { useWeather } from "../../hooks/useWeather";
import { useWeatherStore } from "../../store/weatherStore";

/**
 * WeatherCard component
 *
 * - combines all elements into one main component
 *
 * @returns WeatherCircle WeatherInfo DayIndicator components
 */

function WeatherCard() {
  // Get the current search query from the store
  const { searchQuery } = useWeatherStore();

  // Fetch API key data using the custom hook
  const {
    data,
    isLoading: isApiLoading,
    error,
  } = useWeather(searchQuery ?? "");

  const showLoading = isApiLoading || !searchQuery;

  return (
    <div className="flex flex-col gap-12 w-full">
      <WeatherCircle
        weatherData={data ?? null}
        isLoading={showLoading}
        error={error}
      />
      <WeatherInfo
        weatherData={data ?? null}
        isLoading={showLoading}
        error={error}
      />
      <DayIndicator
        weatherData={data ?? null}
        isLoading={showLoading}
        error={error}
      />
    </div>
  );
}

export default WeatherCard;
