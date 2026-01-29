import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weather";
import { getDayStyle } from "../../../utils/weatherUtils";
import { days } from "../../../data/days";
import { getDayDate } from "../../../utils/formatDate";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

function WeatherInfo({ weatherData, isLoading, error }: WeatherInfoProps) {
  const { dayOffset } = useWeatherStore();
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  const dayStyle = getDayStyle(forecastDay, days);

  const { name } = dayStyle;

  const currentCondition =
    dayOffset === 0
      ? weatherData?.current.condition.text
      : forecastDay?.day.condition.text;

  const formattedDate = getDayDate(forecastDay?.date);

  return (
    <div className="text-white">
      {error ? (
        <div></div>
      ) : (
        <div className="mb-6">
          {isLoading ? (
            <div className="h-10 w-45 mb-0.5 bg-gray-300/30 rounded-2xl animate-pulse"></div>
          ) : (
            <h2 className="text-5xl font-medium mb-0.5">{name}</h2>
          )}
          {isLoading ? (
            <div className="h-7 w-35 bg-gray-300/30 rounded-xl animate-pulse"></div>
          ) : (
            <h2 className="text-xl text-white/60">{formattedDate}</h2>
          )}
        </div>
      )}
      {isLoading ? (
        <div className="h-30 w-full bg-gray-300/30 rounded-xl animate-pulse"></div>
      ) : (
        <p className="text-xl text-white/80">
          {currentCondition}. Temperature range from{" "}
          {forecastDay?.day.mintemp_c}
          °C to {forecastDay?.day.maxtemp_c}°C. Maximum wind speed{" "}
          {forecastDay?.day.maxwind_kph} km/h.{" "}
          {forecastDay?.day.daily_chance_of_rain}% daily chance of rain.
        </p>
      )}
    </div>
  );
}

export default WeatherInfo;
