import Header from "./components/layout/Header";
import WeatherForecast from "./components/WeatherForecast";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStore } from "./store/weatherStore";
import { weatherCondition } from "./data/conditions";

/**
 * Main application component that renders the Header and WeatherForecast components.
 *
 * @returns Header and WeatherForecast components
 */

function App() {
  // Use custom hook to get user's geolocation
  useGeoLocation();

  const { searchQuery, dayOffset } = useWeatherStore();

  // Fetch API key data using the custom hook
  const {
    data,
    isLoading: isApiLoading,
    error,
  } = useWeather(searchQuery ?? "");

  // Determine if we should show the loading state
  const showLoading = isApiLoading || !searchQuery;

  // Condition
  const weather =
    dayOffset === 0
      ? weatherCondition[data?.current.condition.code ?? 1003]
      : weatherCondition[
          data?.forecast?.forecastday[dayOffset].day.condition.code ?? 1003
        ];

  // Get local day for bg loading
  const currentHour = new Date().getHours();
  const isLocalDay = currentHour >= 6 && currentHour < 18;

  const isDay =
    data?.current.is_day !== undefined ? data.current.is_day : isLocalDay;
  const theme =
    dayOffset === 0 ? (isDay ? weather.day : weather.night) : weather.day;

  return (
    <div
      className={`min-h-screen flex flex-col p-6 pb-12 bg-linear-to-br ${theme.bg} transition-colors duration-1000 ease-in-out sm:px-17 sm:py-10 md:px-22 lg:px-28 xl:px-32 2xl:px-70 2xl:pt-15`}
    >
      <Header weatherData={data ?? null} isLoading={showLoading} />

      <WeatherForecast
        weatherData={data ?? null}
        isLoading={showLoading}
        error={error}
      />
    </div>
  );
}

export default App;
