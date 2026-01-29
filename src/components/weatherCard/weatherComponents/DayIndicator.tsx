import { useWeatherStore } from "../../../store/weatherStore";
import { getCurrentDayIndex } from "../../../utils/weatherUtils";
import { days } from "../../../data/days";
import type WeatherData from "../../../types/weather";

interface DayIndicatorProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

function DayIndicator({ weatherData, isLoading, error }: DayIndicatorProps) {
  const { dayOffset } = useWeatherStore();
  const forecastDay = weatherData?.forecast?.forecastday[0];

  const FORECAST_LENGTH = 3;

  const currentDayIndex = getCurrentDayIndex(forecastDay);

  return (
    <>
      {isLoading || error ? (
        <div className="h-2"></div>
      ) : (
        <div className="flex justify-center gap-4">
          {Array.from({ length: FORECAST_LENGTH }).map((_, index) => {
            const dayStyleIndex = (currentDayIndex + index) % 7;
            const dayStyle = days[dayStyleIndex];

            const isActive = index === dayOffset;

            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${dayStyle.color}
                ${isActive ? "scale-150" : "scale-100"}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default DayIndicator;
