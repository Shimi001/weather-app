import Header from "./components/layout/Header";
import WeatherCard from "./components/weatherCard";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { useWeather } from "./hooks/useWeather";
import { useWeatherStore } from "./store/weatherStore";

/**
 * Root component
 *
 * @returns Header and WeatherCard components
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

  const showLoading = isApiLoading || !searchQuery;

  return (
    <div className="min-h-screen flex flex-col">
      <Header weatherData={data ?? null} isLoading={showLoading} />

      <main className="flex-1 flex p-6">
        <WeatherCard
          weatherData={data ?? null}
          isLoading={showLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
