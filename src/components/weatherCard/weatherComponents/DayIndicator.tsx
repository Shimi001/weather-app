import { useWeatherStore } from "../../../store/weatherStore";
import type WeatherData from "../../../types/weather";
import { days } from "../../../data/days";
import { getCurrentDayIndex } from "../../../utils/weatherUtils";

interface DayIndicatorProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * DayIndicator component
 *
 * @param weatherData the full API response object
 * @param isLoading UI loading controls
 * @param error error object if the API call fails
 */

function DayIndicator({ weatherData, isLoading, error }: DayIndicatorProps) {
  // Get the current day offset from the store
  const { dayOffset } = useWeatherStore();

  // Get the first forecast day data
  const forecastDay = weatherData?.forecast?.forecastday[0];

  const FORECAST_LENGTH = 3;

  // Get the current day index to align with the days array
  const currentDayIndex = getCurrentDayIndex(forecastDay);

  return (
    <>
      {isLoading || error ? (
        <div className="h-2"></div>
      ) : (
        <div className="flex justify-center gap-4">
          {Array.from({ length: FORECAST_LENGTH }).map((_, index) => {
            // Calculate the day style index wrapping around the week
            const dayStyleIndex = (currentDayIndex + index) % 7;
            const dayStyle = days[dayStyleIndex];

            // Determine if this dot is the active day
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
