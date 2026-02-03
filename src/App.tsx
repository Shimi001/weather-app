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

  const { data, isLoading: isApiLoading } = useWeather(searchQuery ?? "");

  const showLoading = isApiLoading || !searchQuery;

  return (
    <div className="min-h-screen flex flex-col">
      <Header weatherData={data ?? null} isLoading={showLoading} />

      <main className="flex-1 flex p-6">
        <WeatherCard />
      </main>
    </div>
  );
}

export default App;
