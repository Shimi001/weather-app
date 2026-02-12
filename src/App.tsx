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
      ? weatherCondition[data?.current.condition.code ?? 1000]
      : weatherCondition[
          data?.forecast?.forecastday[dayOffset].day.condition.code ?? 1000
        ];

  const isDay = data?.current.is_day;
  const theme =
    dayOffset === 0 ? (isDay ? weather.day : weather.night) : weather.day;

  return (
    <div
      className={`min-h-screen flex flex-col p-6 bg-linear-to-br ${theme.bg} transition-colors duration-1000 ease-in-out`}
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
