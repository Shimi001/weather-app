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

    switch (name) {
      case "chance_of_precip":
        return `${day.daily_chance_of_rain}%`;

      case "precip_mm":
        return isToday ? `${current.precip_mm} mm` : `${day.totalprecip_mm} mm`;

      case "humidity":
        return isToday ? `${current.humidity}%` : `${day.avghumidity}%`;

      case "uv":
        return isToday ? `${current.uv}` : `${day.uv}`;

      case "wind":
        return isToday ? `${current.wind_kph} km` : `${day.maxwind_kph} km`;

      case "visibility":
        return isToday ? `${current.vis_km} km` : `${day.avgvis_km} km`;

      default:
        return "";
    }
  };

  return (
    <>
      {error ? (
        <div></div>
      ) : (
        <>
          {isLoading ? (
            <div className="h-30 w-full bg-gray-300/20 rounded-xl animate-pulse"></div>
          ) : (
            <div className="grid grid-cols-3 gap-2 mb-8">
              {infoIcon.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index}>
                    <div className="flex flex-col text-center bg-white/10 p-4 w-25 rounded-2xl shadow">
                      <span className="flex text-white/90 justify-center mb-2">
                        <Icon />
                      </span>
                      <span className="text-white">
                        {getInfoValue(info.name)}
                      </span>
                      <span className="text-white/50 text-sm">
                        {info.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default WeatherInfo;
