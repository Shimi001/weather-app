import { MapPin } from "lucide-react";
import type WeatherData from "../../types/weather";
import Logo from "../ui/Logo";

interface HeaderProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Header component
 *
 * @returns Logo component
 */

function Header({ weatherData, isLoading, error }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between p-6">
      <Logo />

      {error ? (
        <div></div>
      ) : (
        <>
          {isLoading ? (
            <div className="h-7 w-35 bg-gray-300/30 rounded-xl animate-pulse"></div>
          ) : (
            <div className="text-white">
              <button className="flex items-center bg-white/10 px-4 py-2 gap-1 rounded-2xl">
                <MapPin size={16} className="shrink-0" />
                <span className="text-xl font-medium">
                  {weatherData?.location?.name}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
