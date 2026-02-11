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
  const weatherCode = weatherData?.current.condition.code ?? 1000;
  const weather = weatherCondition[weatherCode];

  const isDay = weatherData?.current.is_day;
  const theme = isDay ? weather.day : weather.night;

  const Icon = theme.icon;

  // Day theme
  let dayTheme = "bg-white/10";
  if (isDay === 1) {
    dayTheme = "bg-black/10";
  }

  return (
    <div className={`text-white ${dayTheme} p-8 py-9 rounded-3xl shadow mb-5`}>
      {error ? (
        <div></div>
      ) : (
        <>
          {/* day of the week and date */}
          <div className="mb-8">
            {isLoading ? (
              <div className="h-10 w-45 mb-0.5 bg-gray-300/20 rounded-2xl animate-pulse"></div>
            ) : (
              <h2 className="text-5xl font-medium mb-0.5">{dayName}</h2>
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
          <div className="flex justify-center mb-6">
            {isLoading ? (
              <div className="h-14 w-14 bg-gray-300/20 rounded-full animate-pulse"></div>
            ) : (
              <Icon size={70} className={`${theme.text}`} />
            )}
          </div>

          {/* temperature */}
          <div className="flex justify-center mb-2">
            {isLoading ? (
              <div className="h-14 w-14 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="text-6xl font-medium">
                {Math.round(temperature ?? 0)}
              </span>
            )}
          </div>

          {/* condition */}
          <div className="flex justify-center text-white/60 text-xl mb-6">
            {isLoading ? (
              <div className="h-7 w-40 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="font-medium">{currentCondition}</span>
            )}
          </div>

          {/* temperature range */}
          <div className="flex flex-row justify-evenly text-xl">
            {isLoading ? (
              <div className="h-7 w-13 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="flex flex-row text-white/75">
                L {forecastDay?.day.mintemp_c}
              </span>
            )}

            {isLoading ? (
              <div className="h-7 w-13 bg-gray-300/20 rounded-xl animate-pulse"></div>
            ) : (
              <span className="flex flex-row text-white/75">
                H {forecastDay?.day.maxtemp_c}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
