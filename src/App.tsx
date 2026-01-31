import Header from "./components/layout/Header";
import WeatherCard from "./components/weatherCard";
import { useGeoLocation } from "./hooks/useGeoLocation";

/**
 * Root component
 * 
 * @returns Header and WeatherCard components
 */

function App() {
  // Use custom hook to get user's geolocation
  useGeoLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex p-6">
        <WeatherCard />
      </main>
    </div>
  );
}

export default App;
