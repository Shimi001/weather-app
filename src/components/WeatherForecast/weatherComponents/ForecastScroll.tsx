import type WeatherData from "../../../types/weatherApiForecast";
import { useWeatherStore } from "../../../store/weatherStore";
import { weatherCondition } from "../../../data/conditions";

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

function ForecastScroll({
  weatherData,
  isLoading,
  error,
}: ForecastScrollProps) {
  const { dayOffset, setDayOffset } = useWeatherStore();

  // Get the forecast day data based on the current day offset
  const forecastDay = weatherData?.forecast?.forecastday || [];

  // Get the day of the week
  const getDayName = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Day theme
  let dayTheme = "bg-white/10";
  if (weatherData?.current.is_day === 1 || dayOffset !== 0) {
    dayTheme = "bg-black/10";
  }

  // Loading skeleton
  if (isLoading) {
    const skeletons = Array.from({ length: 3 });

    return (
      <>
        <h2 className="text-white/70 font-bold animate-pulse mb-3 sm:mb-5 md:mb-6 lg:col-span-2 lg:mt-10 xl:text-xl">
          3-day forecast
        </h2>
        <div className="flex flex-row justify-around lg:col-span-2">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="h-43 w-23 bg-gray-300/20 animate-pulse rounded-2xl sm:w-30 lg:h-20 lg:w-55 lg:rounded-3xl"
            ></div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="lg:col-span-2">
      {error ? (
        <div></div>
      ) : (
        <h2 className="text-white/70 font-bold mb-3 sm:mb-4 lg:mt-10 lg:mb-5 xl:text-xl xl:mb-7 2xl:mt-12 2xl:mb-9">
          3-day forecast
        </h2>
      )}
      <div className="flex flex-row justify-around">
        {forecastDay.map((day, index) => {
          const isToday = index === 0;

          const code = isToday
            ? weatherData?.current.condition.code
            : day.day.condition.code;

          const isDayTime = isToday ? weatherData?.current.is_day : 1;

          const weatherConf = weatherCondition[code || 1000];
          const theme = isDayTime ? weatherConf?.day : weatherConf?.night;
          const Icon = theme?.icon;

          const isActive = index === dayOffset;
          const dayName = getDayName(day.date);
          return (
            <button
              key={day.date_epoch}
              onClick={() => setDayOffset(index)}
              className={`flex flex-col ${dayTheme} shadow rounded-2xl text-center p-5 px-6 transition duration-1000 ease-in-out cursor-pointer sm:px-12 sm:rounded-3xl lg:flex-row lg:items-center lg:gap-4 lg:px-12.5 xl:gap-7 xl:px-14 xl:py-6 2xl:gap-8 2xl:px-17
              ${isActive ? "scale-110 shadow-xl border border-white/20" : "border-white/20"}`}
            >
              {/* Day name */}
              <span className="text-white/70 mb-3 lg:mb-0 xl:text-lg 2xl:text-xl">
                {dayName}
              </span>

              {/* Icon */}
              <Icon className="text-white/95 mb-2 w-11 h-11 lg:mb-0 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14" />

              {/* H - L temp */}
              <div className="flex flex-col">
                <span className="text-white/90 xl:text-lg 2xl:text-xl">
                  {day.day.maxtemp_c}°
                </span>
                <span className="text-white/60 text-xs 2xl:text-base">
                  {day.day.mintemp_c}°
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastScroll;
