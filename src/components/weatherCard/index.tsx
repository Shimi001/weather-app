import WeatherCircle from "./weatherComponents/WeatherCircle";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import DayIndicator from "./weatherComponents/DayIndicator";
import { useWeather } from "../../hooks/useWeather";

function WeatherCard() {
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
