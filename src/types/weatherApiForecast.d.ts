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
    wind_kph: number;
    precip_mm: number;
    humidity: number;
    vis_km: number;
    uv: number;
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
  totalprecip_mm: number;
  maxwind_kph: number;
  avgvis_km: number;
  avghumidity: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  condition: {
    text: string;
    code: number;
  };
  uv: number;
}
