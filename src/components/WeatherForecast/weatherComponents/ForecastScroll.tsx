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

function ForecastScroll({ weatherData }: ForecastScrollProps) {
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
  if (weatherData?.current.is_day === 1) {
    dayTheme = "bg-black/10";
  }

  return (
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
            className={`flex flex-col ${dayTheme} shadow rounded-2xl text-center p-5 px-6 ${isActive ? "scale-110 shadow-xl" : ""}`}
          >
            <span className="text-white/70 mb-3">{dayName}</span>
            <Icon size={45} className="text-white/95 mb-2" />
            <span className="text-white/90">{day.day.maxtemp_c}</span>
            <span className="text-white/60 text-xs">{day.day.mintemp_c}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ForecastScroll;
