import { useEffect } from "react";
import { useWeatherStore } from "../store/weatherStore";

const DEFAULT_CITY = "London";

/**
 * Custom hook to get user's geolocation and set it in the weather store
 */

export const useGeoLocation = () => {
  // Access weather store to set search query
  const { setSearchQuery, searchQuery } = useWeatherStore();

  useEffect(() => {
    // If search query is already set, do nothing
    if (searchQuery) return;

    // Request geolocation from the browser
    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const coords = `${latitude},${longitude}`;
      setSearchQuery(coords);
    };

    // Handle geolocation errors by setting default city
    const onError = (error: GeolocationPositionError) => {
      console.warn("Geolocation denied or failed:", error.message);
      setSearchQuery(DEFAULT_CITY);
    };

    // Invoke geolocation API
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [setSearchQuery, searchQuery]);
};
