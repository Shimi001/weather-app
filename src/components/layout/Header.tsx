import { useState, useEffect } from "react";
import { MapPin, MapPinPen } from "lucide-react";
import Logo from "../ui/Logo";
import type WeatherData from "../../types/weather";
import { useWeatherStore } from "../../store/weatherStore";
import type { SearchCity } from "../../api/weatherApi";
import { searchCities } from "../../api/weatherApi";

interface HeaderProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

/**
 * Header component
 *
 * @returns Logo component and city search functionality
 */

function Header({ weatherData, isLoading }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [cityInput, setCityInput] = useState("");

  // Weather store variables and functions
  const { setSearchQuery, isManualSearch } = useWeatherStore();
  const { setDayOffset } = useWeatherStore();

  // State for city search options
  const [options, setOptions] = useState<SearchCity[]>([]);

  // Effect to fetch city options based on input
  useEffect(() => {
    // Clear options if input is empty or too short
    if (cityInput.length < 3) {
      return;
    }

    // Debounce the search to avoid excessive API calls
    const timeId = setTimeout(async () => {
      try {
        const result = await searchCities(cityInput);
        setOptions(result);
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    }, 500);

    return () => {
      clearTimeout(timeId);
      setOptions([]);
    };
  }, [cityInput]);

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
    setOptions([]);
  };

  return (
    <header className="flex flex-row justify-between p-6">
      <Logo />

      {isLoading ? (
        <div className="h-10 w-35 bg-gray-300/30 rounded-xl animate-pulse"></div>
      ) : (
        // City search and display section
        <div className="text-white">
          {isEditing ? (
            <>
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white/10 px-4 py-2 gap-1 rounded-2xl border w-fit max-w-42"
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
                <ul className="absolute text-xl z-10 space-y-4 p-2 px-4 bg-black/70 border w-42 rounded-2xl">
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
                className="flex items-center bg-white/10 px-4 py-2 gap-1 rounded-2xl"
              >
                {isManualSearch ? (
                  <MapPinPen size={16} className="shrink-0" />
                ) : (
                  <MapPin size={16} className="shrink-0" />
                )}
                <span className="text-xl font-medium">
                  {weatherData?.location?.name}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
