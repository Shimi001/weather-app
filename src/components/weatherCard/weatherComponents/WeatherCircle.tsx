import NavArrows from "./NavArrows";
import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weather";
import { days } from "../../../data/days";
import { getDayStyle } from "../../../utils/weatherUtils";

interface WeatherCircleProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * WeatherCircle component
 *
 * @param weatherData the full API response object
 * @param isLoading controls the skeleton loading UI
 * @param error error object if the API call fails
 */

function WeatherCircle({ weatherData, isLoading, error }: WeatherCircleProps) {
  // Get the current day offset from the store
  const { dayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  // Get the style for the day based on the forecast data and days array
  const dayStyle = getDayStyle(forecastDay, days);

  // Destructure color and symbol from the day style
  const { color, symbol } = dayStyle;

  // Current temperature and icon based on day offset
  const temperature =
    dayOffset === 0 ? weatherData?.current.temp_c : forecastDay?.day.avgtemp_c;

  const icon =
    dayOffset === 0
      ? weatherData?.current.condition.icon
      : forecastDay?.day.condition.icon;

  return (
    <div className="mx-auto relative">
      {/* Navigation arrows */}
      {error ? <div></div> : <NavArrows />}

      <div
        className={`text-white w-64 h-64 rounded-full relative ${
          !error ? color : "bg-gray-400"
        }`}
      >
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center">
            <span className="text-2xl font-bold">Error</span>
            <span className="text-sm">{error.message}</span>
          </div>
        ) : (
          <>
            {/* temperature */}
            <div className="absolute top-1/4 left-1/2 -translate-x-6 -translate-y-5">
              {isLoading ? (
                <div className="h-14 w-14 bg-gray-300/50 rounded-xl animate-pulse"></div>
              ) : (
                <span className="text-5xl">
                  {Math.round(temperature ?? 0)}°
                </span>
              )}
            </div>

            {/* icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-7 translate-y-1">
              {isLoading ? (
                <div className="h-14 w-14 bg-gray-300/50 rounded-full animate-pulse"></div>
              ) : (
                <img src={icon} alt="Weather icon" className="text-5xl" />
              )}
            </div>

            {/* japanese symbol for the day of the week */}
            <div className="absolute top-1/2 right-1 -translate-x-5 -translate-y-11">
              {isLoading ? (
                <div className="h-21 w-5 bg-gray-300/50 rounded-xl animate-pulse"></div>
              ) : (
                <div className="flex flex-col text-xl font-bold text-white/70">
                  <span>{symbol}</span>
                  <span>曜</span>
                  <span>日</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherCircle;
