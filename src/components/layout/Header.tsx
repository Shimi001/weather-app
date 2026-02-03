import { useState } from "react";
import { MapPin, MapPinPen } from "lucide-react";
import Logo from "../ui/Logo";
import type WeatherData from "../../types/weather";
import { useWeatherStore } from "../../store/weatherStore";

interface HeaderProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

/**
 * Header component
 *
 * @returns Logo component
 */

function Header({ weatherData, isLoading }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const { setSearchQuery, isManualSearch } = useWeatherStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (cityInput.trim()) {
      setSearchQuery(cityInput, true);
      setIsEditing(false);
      setCityInput("");
    }
  };

  return (
    <header className="flex flex-row justify-between p-6">
      <Logo />

      {isLoading ? (
        <div className="h-10 w-35 bg-gray-300/30 rounded-xl animate-pulse"></div>
      ) : (
        <div className="text-white">
          {isEditing ? (
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
          ) : (
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
