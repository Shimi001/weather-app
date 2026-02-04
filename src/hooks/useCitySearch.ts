import { useState, useEffect } from "react";
import { searchCities } from "../api/weatherApi";
import type SearchCity from "../types/weatherApiSearch";

/**
 * useCitySearch custom hook to search for cities
 *
 * @param cityInput the city name input string
 * @returns a list of SearchCity options
 */

export const useCitySearch = (cityInput: string) => {
  const [options, setOptions] = useState<SearchCity[]>([]);

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

    // Cleanup function to clear timeout and reset options
    return () => {
      clearTimeout(timeId);
      setOptions([]);
    };
  }, [cityInput]);

  return options;
};
