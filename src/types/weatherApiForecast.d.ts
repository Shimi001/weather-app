/**
 * API response structure
 */

export default interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    is_day: boolean;
    condition: {
      text: string;
      code: number;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: DayWeather;
}

export interface DayWeather {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  condition: {
    text: string;
    code: number;
  };
}
