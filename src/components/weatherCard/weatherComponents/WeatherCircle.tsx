import NavArrows from "./NavArrows";
import type WeatherData from "../../../types/weather";
import { useWeatherStore } from "../../../store/weatherStore";
import { getThreeDaysConfig } from "../../../utils/dateUtils";

interface WeatherCircleProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

function WeatherCircle({ weatherData, isLoading, error }: WeatherCircleProps) {
  const { dayOffset } = useWeatherStore();

  const config = getThreeDaysConfig();
  const { color, symbol } = config[dayOffset];
  return (
    <div className="mx-auto relative">
      <NavArrows />
      <div
        className={`text-white w-64 h-64 rounded-full relative ${
          !error ? color : "bg-white"
        }`}
      >
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center animate-pulse">
            <span className="text-2xl font-bold">Error</span>
            <span className="text-sm">{error.message}</span>
          </div>
        ) : (
          <>
            {/* -translate-x-6 = 2 digits, -translate-x-3 = 1 digit */}
            <div className="absolute top-1/4 left-1/2 -translate-x-6 -translate-y-5">
              {isLoading ? (
                <div className="h-14 w-14 bg-gray-300 rounded-xl animate-pulse"></div>
              ) : (
                <span className="text-5xl">
                  {Math.round(weatherData?.current.temp_c ?? 0)}°
                </span>
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-7 translate-y-1">
              {isLoading ? (
                <div className="h-14 w-14 bg-gray-300 rounded-full animate-pulse"></div>
              ) : (
                <img
                  src={weatherData?.current.condition.icon}
                  alt={`${weatherData?.current.condition.text || "Weather"} icon`}
                  className="text-5xl"
                />
              )}
            </div>
            <div className="absolute top-1/2 right-1 -translate-x-5 -translate-y-11">
              {isLoading ? (
                <div className="h-21 w-5 bg-gray-300 rounded-xl animate-pulse"></div>
              ) : (
                <div className="flex flex-col text-xl text-white/70">
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
