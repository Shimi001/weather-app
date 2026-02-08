import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weatherApiForecast";

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

  return (
    <>
      {error ? (
        <div></div>
      ) : (
        <>
          {isLoading ? (
            <div className="h-30 w-full bg-gray-300/20 rounded-xl animate-pulse"></div>
          ) : (
            <div className="flex justify-between mb-8">
              <div className="flex flex-col border bg-white/10 border-white/20 p-4 w-25 rounded-2xl text-center shadow">
                <span className="text-2xl">💧</span>
                <span className="text-white">
                  {forecastDay?.day.daily_chance_of_rain}%
                </span>
                <span className="text-white/50 text-sm">precip</span>
              </div>
              <div className="flex flex-col border bg-white/10 border-white/20 p-4 w-25 rounded-2xl text-center shadow">
                <span className="text-2xl">💨</span>
                <span className="text-white">
                  {forecastDay?.day.maxwind_kph}
                </span>
                <span className="text-white/50 text-sm">km/h</span>
              </div>
              <div className="flex flex-col border bg-white/10 border-white/20 p-4 w-25 rounded-2xl text-center shadow">
                <span className="text-2xl">💦</span>
                <span className="text-white">
                  {forecastDay?.day.daily_chance_of_rain}%
                </span>
                <span className="text-white/50 text-sm">humidity</span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default WeatherInfo;
