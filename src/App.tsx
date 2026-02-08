import Header from "./components/layout/Header";
import WeatherForecast from "./components/WeatherForecast";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStore } from "./store/weatherStore";

/**
 * Main application component that renders the Header and WeatherForecast components.
 *
 * @returns Header and WeatherForecast components
 */

function App() {
  // Use custom hook to get user's geolocation
  useGeoLocation();

  const { searchQuery } = useWeatherStore();

  // Fetch API key data using the custom hook
  const {
    data,
    isLoading: isApiLoading,
    error,
  } = useWeather(searchQuery ?? "");

  // Determine if we should show the loading state
  const showLoading = isApiLoading || !searchQuery;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-linear-to-br from-blue-400 via-indigo-400 to-violet-400 ">
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
