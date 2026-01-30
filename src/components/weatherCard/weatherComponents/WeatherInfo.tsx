import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weather";
import { days } from "../../../data/days";
import { getDayStyle } from "../../../utils/weatherUtils";
import { getDayDate } from "../../../utils/formatDate";

interface WeatherInfoProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * WeatherInfo component
 *
 * @param weatherData the full API response object
 * @param isLoading controls the skeleton loading UI
 * @param error error object if the API call fails
 */

function WeatherInfo({ weatherData, isLoading, error }: WeatherInfoProps) {
  // Get the current day offset from the store
  const { dayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  // Get the style for the day based on the forecast data and days array
  const dayStyle = getDayStyle(forecastDay, days);

  // Destructure name from the day style
  const { name } = dayStyle;

  // Current condition based on day offset
  const currentCondition =
    dayOffset === 0
      ? weatherData?.current.condition.text
      : forecastDay?.day.condition.text;

  // Formatted date
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
            <h2 className="text-xl font-medium text-white/60">
              {formattedDate}
            </h2>
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
