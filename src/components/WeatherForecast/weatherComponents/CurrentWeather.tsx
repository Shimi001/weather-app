import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weatherApiForecast";
import { weatherCondition } from "../../../data/conditions";
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
  const { dayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  // Get the day of the week
  const getDayName = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", { weekday: "long" });
  };

  const dayName = getDayName(forecastDay?.date || "");

  // Formatted date
  const formattedDate = getDayDate(forecastDay?.date);

  // Current condition
  const temperature =
    dayOffset === 0 ? weatherData?.current.temp_c : forecastDay?.day.avgtemp_c;

  const currentCondition =
    dayOffset === 0
      ? weatherData?.current.condition.text
      : forecastDay?.day.condition.text;

  // Weather Icon
  const weather =
    dayOffset === 0
      ? weatherCondition[weatherData?.current.condition.code ?? 1000]
      : weatherCondition[forecastDay?.day.condition.code ?? 1000];

  const isDay = weatherData?.current.is_day;
  const theme =
    dayOffset === 0 ? (isDay ? weather.day : weather.night) : weather.day;

  const Icon = theme.icon;

  // Day theme
  let dayTheme = "bg-white/10";
  if (isDay === 1 || dayOffset !== 0) {
    dayTheme = "bg-black/10";
  }

  return (
    <>
      {error ? (
        <div
          className={`${dayTheme} p-5 py-10 w-full rounded-3xl text-red-400 text-center text-2xl`}
        >
          {error.message}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="h-107 w-full bg-gray-300/20 animate-pulse rounded-3xl mb-5 lg:mb-0 xl:h-130 2xl:150"></div>
          ) : (
            <div
              className={`text-white ${dayTheme} p-8 py-9 mb-5 rounded-3xl shadow transition-colors duration-1000 ease-in-out sm:py-12 lg:mb-0 xl:py-14 xl:mx-5 2xl:mx-10 2xl:py-18 2xl:rounded-4xl`}
            >
              {/* day of the week and date */}
              <div className="mb-8 sm:px-6 xl:mb-9 2xl:px-8">
                <h2 className="text-5xl text-white font-medium mb-1 xl:mb-2 2xl:text-6xl">
                  {dayName}
                </h2>
                <h2 className="text-xl text-white/60 font-medium px-1 2xl:text-2xl">
                  {formattedDate}
                </h2>
              </div>

              {/* icon */}
              <div className="flex justify-center mb-6 xl:mb-8 2xl:mb-10">
                <Icon
                  className={`${theme.text} w-18 h-18 sm:w-20 sm:h-20 xl:w-22 xl:h-22 2xl:w-26 2xl:h-26`}
                />
              </div>

              {/* temperature */}
              <div className="flex justify-center mb-2 xl:mb-3">
                <span className="text-6xl text-white font-medium 2xl:text-7xl">
                  {Math.round(temperature ?? 0)}°
                </span>
              </div>

              {/* condition */}
              <div className="flex justify-center text-white/60 text-xl mb-6 sm:mb-8 xl:mb-10 2xl:mb-16 2xl:text-2xl">
                <span className="font-medium text-center">
                  {currentCondition}
                </span>
              </div>

              {/* temperature range */}
              <div className="flex flex-row justify-evenly text-xl xl:text-2xl">
                <span className="flex flex-row text-white/75">
                  L {forecastDay?.day.mintemp_c}°
                </span>

                <span className="flex flex-row text-white/75">
                  H {forecastDay?.day.maxtemp_c}°
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CurrentWeather;
