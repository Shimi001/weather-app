import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weatherApiForecast";
import { getDayStyle } from "../../../utils/weatherUtils";
import { days } from "../../../data/days";
import { getDayDate } from "../../../utils/formatDate";

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * CurrentWeather component
 *
 * @param weatherData the full API response object
 * @param isLoading controls the skeleton loading UI
 * @param error error object if the API call fails
 */

function CurrentWeather({
  weatherData,
  isLoading,
  error,
}: CurrentWeatherProps) {
  // Get the current day offset from the store
  const { dayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  // Get the style for the day based on the forecast data and days array
  const dayStyle = getDayStyle(forecastDay, days);

  // Destructure name from the day style
  const { name } = dayStyle;

  // Formatted date
  const formattedDate = getDayDate(forecastDay?.date);

  // Current temperature and icon based on day offset
  const temperature =
    dayOffset === 0 ? weatherData?.current.temp_c : forecastDay?.day.avgtemp_c;

  // Current icon based on day offset
  const icon =
    dayOffset === 0
      ? weatherData?.current.condition.icon
      : forecastDay?.day.condition.icon;

  // Current condition based on day offset
  const currentCondition =
    dayOffset === 0
      ? weatherData?.current.condition.text
      : forecastDay?.day.condition.text;

  return (
    <div className="text-white border bg-white/10 border-white/20 backdrop-blur-lg p-8 rounded-3xl shadow mb-5">
      {error ? (
        <div></div>
      ) : (
        <>
          {/* day of the week and date */}
          <div className="mb-6">
            {isLoading ? (
              <div className="h-10 w-45 mb-0.5 bg-gray-300/20 rounded-2xl animate-pulse"></div>
            ) : (
              <h2 className="text-5xl font-medium mb-0.5">{name}</h2>
            )}
            {isLoading ? (
              <div className="h-7 w-35 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <h2 className="text-xl font-medium text-white/60">
                {formattedDate}
              </h2>
            )}
          </div>

          {/* icon */}
          <div className="flex justify-center mb-5">
            {isLoading ? (
              <div className="h-14 w-14 bg-gray-300/20 rounded-full animate-pulse"></div>
            ) : (
              <img src={icon} alt="Weather icon" />
            )}
          </div>

          {/* temperature */}
          <div className="flex justify-center mb-2">
            {isLoading ? (
              <div className="h-14 w-14 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="text-6xl font-medium">
                {Math.round(temperature ?? 0)}°
              </span>
            )}
          </div>

          {/* condition */}
          <div className="flex justify-center text-white/60 text-xl mb-5">
            {isLoading ? (
              <div className="h-7 w-40 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span> {currentCondition}</span>
            )}
          </div>

          {/* temperature range */}
          <div className="flex flex-row justify-evenly text-xl">
            {isLoading ? (
              <div className="h-7 w-13 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="flex flex-row text-white/90">
                H {forecastDay?.day.maxtemp_c}°
              </span>
            )}

            {isLoading ? (
              <div className="h-7 w-13 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="flex flex-row text-white/90">
                L {forecastDay?.day.mintemp_c}°
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
