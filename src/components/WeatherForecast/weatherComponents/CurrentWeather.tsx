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
            <div className="h-107 w-full bg-gray-300/20 animate-pulse rounded-3xl mb-5"></div>
          ) : (
            <div
              className={`text-white ${dayTheme} p-8 py-9 rounded-3xl shadow mb-5`}
            >
              {/* day of the week and date */}
              <div className="mb-8">
                <h2 className="text-5xl font-medium mb-0.5">{dayName}</h2>
                <h2 className="text-xl font-medium text-white/60">
                  {formattedDate}
                </h2>
              </div>

              {/* icon */}
              <div className="flex justify-center mb-6">
                <Icon size={70} className={`${theme.text}`} />
              </div>

              {/* temperature */}
              <div className="flex justify-center mb-2">
                <span className="text-6xl font-medium">
                  {Math.round(temperature ?? 0)}
                </span>
              </div>

              {/* condition */}
              <div className="flex justify-center text-white/60 text-xl mb-6">
                <span className="font-medium text-center">
                  {currentCondition}
                </span>
              </div>

              {/* temperature range */}
              <div className="flex flex-row justify-evenly text-xl">
                <span className="flex flex-row text-white/75">
                  L {forecastDay?.day.mintemp_c}
                </span>

                <span className="flex flex-row text-white/75">
                  H {forecastDay?.day.maxtemp_c}
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
