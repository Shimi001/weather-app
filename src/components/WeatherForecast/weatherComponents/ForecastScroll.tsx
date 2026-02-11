import type WeatherData from "../../../types/weatherApiForecast";
import { useWeatherStore } from "../../../store/weatherStore";
import { weatherCondition } from "../../../data/conditions";
import { dayOfWeek } from "../../../data/days";

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

  // Get day of the week
  const getDayName = (dateString: string) => {
    const dateObj = new Date(dateString);
    const dayIndex = dateObj.getDay();
    return dayOfWeek[dayIndex].name.slice(0, 3);
  };

  // Day theme
  let dayTheme = "bg-white/10";
  if (weatherData?.current.is_day === 1) {
    dayTheme = "bg-black/10";
  }

  return (
    <div className="flex flex-row justify-around">
      {forecastDay.map((day, index) => {
        const code = day.day.condition.code;

        const weather = weatherCondition[code];
        const theme = weather?.day;
        const Icon = theme?.icon;

        const isActiv = index === dayOffset;
        const dayName = getDayName(day.date);
        return (
          <button
            key={day.date_apoch}
            onClick={() => setDayOffset(index)}
            className={`flex flex-col ${dayTheme} shadow rounded-2xl text-center p-5 px-6 ${isActiv ? "scale-110 shadow-xl" : ""}`}
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
