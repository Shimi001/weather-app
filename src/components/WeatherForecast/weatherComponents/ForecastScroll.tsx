import type WeatherData from "../../../types/weatherApiForecast";
import { useWeatherStore } from "../../../store/weatherStore";

interface ForecastScrollProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * ForecastScroll component
 *
 * @param weatherData the full API response object
 */

function ForecastScroll({ weatherData }: ForecastScrollProps) {
  // Get the current day offset from the store
  const { dayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday[dayOffset];

  const icon =
    dayOffset === 0
      ? weatherData?.current.condition.icon
      : forecastDay?.day.condition.icon;

  return (
    <div className="flex flex-row justify-around text-white">
      <div className="flex flex-col border bg-white/10 border-white/20 shadow-lg p-5 rounded-2xl text-center scale-110">
        <span className="text-white/70 mb-2">Sa</span>
        <img src={icon} alt="Weather icon" className="h-12" />
        <span>{forecastDay?.day.maxtemp_c}</span>
        <span className="text-white/60 text-xs">
          {forecastDay?.day.mintemp_c}
        </span>
      </div>
      <div className="flex flex-col border bg-white/10 border-white/20 shadow p-5 rounded-2xl text-center">
        <span className="text-white/70 mb-2">Sa</span>
        <img src={icon} alt="Weather icon" className="h-12" />
        <span>{forecastDay?.day.maxtemp_c}</span>
        <span className="text-white/60 text-xs">
          {forecastDay?.day.mintemp_c}
        </span>
      </div>
      <div className="flex flex-col border bg-white/10 border-white/20 shadow p-5 rounded-2xl text-center">
        <span className="text-white/70 mb-2">Sa</span>
        <img src={icon} alt="Weather icon" className="h-12" />
        <span>{forecastDay?.day.maxtemp_c}</span>
        <span className="text-white/60 text-xs">
          {forecastDay?.day.mintemp_c}
        </span>
      </div>
    </div>
  );
}

export default ForecastScroll;
