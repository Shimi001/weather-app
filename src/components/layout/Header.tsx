import { useState } from "react";
import { MapPin, MapPinPen } from "lucide-react";
import type WeatherData from "../../types/weatherApiForecast";
import { useWeatherStore } from "../../store/weatherStore";
import { useCitySearch } from "../../hooks/useCitySearch";

interface HeaderProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

/**
 * Header component
 *
 * @returns City search
 */

function Header({ weatherData, isLoading }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [cityInput, setCityInput] = useState("");

  // Weather store variables and functions
  const { setSearchQuery, isManualSearch, dayOffset } = useWeatherStore();
  const { setDayOffset } = useWeatherStore();

  const options = useCitySearch(cityInput);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (cityInput.trim()) {
      setSearchQuery(cityInput, true);
      setIsEditing(false);
      setCityInput("");
    }
  };

  // Handle clicking on a city option
  const handleOptionClick = (cityUrl: string) => {
    setSearchQuery(cityUrl, true);
    setIsEditing(false);
    setDayOffset(0);
    setCityInput("");
  };

  // Day theme
  let dayTheme = "bg-white/10 border-white/15";
  if (weatherData?.current.is_day === 1 || dayOffset !== 0) {
    dayTheme = "bg-black/10 border-black/5";
  }

  return (
    <header className="flex flex-row justify-between mb-6 ml-2">
      {isLoading ? (
        <div className="h-11 w-35 bg-gray-300/20 rounded-3xl animate-pulse"></div>
      ) : (
        // City search and display section
        <div className="text-white">
          {isEditing ? (
            <>
              <form
                onSubmit={handleSearch}
                className={`flex items-center border ${dayTheme} backdrop-blur-lg shadow px-5 py-2 gap-1 rounded-3xl w-fit max-w-42 ${
                  options.length > 0 && isEditing ? "" : ""
                }`}
              >
                <MapPinPen size={16} className="shrink-0 opacity-30" />
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder={weatherData?.location?.name}
                  className="text-xl font-medium placeholder:opacity-20 outline-none focus:ring-0 min-w-0"
                  autoFocus
                  onBlur={() => {
                    if (!cityInput.trim()) setIsEditing(false);
                  }}
                />
              </form>
              {options.length > 0 && isEditing && (
                <ul
                  className={`absolute text-xl z-10 space-y-4 p-2 px-4 pb-5 mt-2 border ${dayTheme} backdrop-blur-lg w-42 rounded-3xl`}
                >
                  {options.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => handleOptionClick(city.url)}
                    >
                      <div>{city.name}</div>
                      <div className="text-xs text-white/70">
                        {city.country}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            // Display current city name with edit button
            <>
              <button
                onClick={() => setIsEditing(true)}
                className={`flex items-center border ${dayTheme} px-5 py-2 gap-1 rounded-3xl shadow`}
              >
                {isManualSearch ? (
                  <MapPinPen size={16} className="shrink-0" />
                ) : (
                  <MapPin size={16} className="shrink-0" />
                )}
                <span className="text-xl font-medium">
                  {weatherData?.location?.name}
                </span>
                <span className="text-white/50">⌄</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
