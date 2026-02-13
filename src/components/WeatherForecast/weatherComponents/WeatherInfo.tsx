import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weatherApiForecast";
import { infoIcon } from "../../../data/infoIcons";

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
  const { dayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  // Get info values from API key
  const getInfoValue = (name: string) => {
    if (!forecastDay || !weatherData) return "N/A";

    const { day } = forecastDay;
    const { current } = weatherData;

    const isToday = dayOffset === 0;

    // If the value is greater than 10, round it to the nearest integer
    const formatNumber = (num: number) => {
      return num > 10 ? Math.round(num) : num;
    };

    switch (name) {
      case "chance_of_precip":
        return `${day.daily_chance_of_rain}%`;

      case "precip_mm":
        return isToday
          ? `${formatNumber(current.precip_mm)} mm`
          : `${formatNumber(day.totalprecip_mm)} mm`;

      case "humidity":
        return isToday ? `${current.humidity}%` : `${day.avghumidity}%`;

      case "uv":
        return isToday ? `${current.uv}` : `${day.uv}`;

      case "wind":
        return isToday ? `${current.wind_kph}` : `${day.maxwind_kph}`;

      case "visibility":
        return isToday ? `${current.vis_km} km` : `${day.avgvis_km} km`;

      default:
        return "";
    }
  };

  // Day theme
  let dayTheme = "bg-white/10";
  if (weatherData?.current.is_day === 1 || dayOffset !== 0) {
    dayTheme = "bg-black/10";
  }

  return (
    <>
      {error ? (
        <div></div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 mb-8 sm:gap-4 sm:mb-10 lg:grid-cols-2 lg:mb-0 lg:px-6 xl:px-9 xl:gap-7 2xl:gap-8 2xl:px-12">
            {infoIcon.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index}>
                  {isLoading ? (
                    <div className="h-27 w-full bg-gray-300/20 animate-pulse rounded-2x lg:h-full lg:rounded-3xl"></div>
                  ) : (
                    <div
                      className={`flex flex-col text-center ${dayTheme} p-4 w-full rounded-2xl shadow transition-colors duration-1000 ease-in-out sm:py-6 lg:h-full lg:justify-center`}
                    >
                      {/* Icon */}
                      <span className="flex text-white/90 justify-center mb-2 2xl:mb-4">
                        <Icon className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-11 2xl:h-11" />
                      </span>

                      {/* Value */}
                      <span className="text-white xl:text-lg 2xl:text-2xl 2xl:mb-0.5">
                        {getInfoValue(info.name)}
                      </span>

                      {/* Lable */}
                      <span className="text-white/70 xl:text-lg 2xl:text-xl">{info.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default WeatherInfo;
