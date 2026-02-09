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

  const getInfoValue = (name: string) => {
    if (!forecastDay) return "N/A";
    const { day } = forecastDay;

    switch (name) {
      case "precip":
        return `${day.daily_chance_of_rain}%`;
      case "humidity":
        return `${weatherData.current.humidity}%`;
      case "km/h": // wind
        return `${weatherData.current.wind_kph}`;
      case "feels like":
        return `${day.avgtemp_c}`;
      case "UV":
        return day.uv;
      case "visibility":
        return `${weatherData.current.vis_km} km`;
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
                    <div className="flex flex-col bg-white/10 p-4 w-25 rounded-2xl text-center shadow">
                      <span className="flex text-white/90 justify-center mb-2">
                        <Icon />
                      </span>
                      <span className="text-white">
                        {getInfoValue(info.name)}
                      </span>
                      <span className="text-white/50 text-sm">{info.name}</span>
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
