import WeatherCircle from "./weatherComponents/WeatherCircle";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import DayIndicator from "./weatherComponents/DayIndicator";
import { useWeather } from "../../hooks/useWeather";

/**
 * WeatherCard component
 * 
 * - combines all elements into one main component
 * 
 * @returns WeatherCircle WeatherInfo DayIndicator components
 */

function WeatherCard() {
  // Fetch API key data using the custom hook
  const { data, isLoading, error } = useWeather("Vienna");

  return (
    <div className="flex flex-col gap-12 w-full">
      <WeatherCircle
        weatherData={data ?? null}
        isLoading={isLoading}
        error={error}
      />
      <WeatherInfo
        weatherData={data ?? null}
        isLoading={isLoading}
        error={error}
      />
      <DayIndicator
        weatherData={data ?? null}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default WeatherCard;
