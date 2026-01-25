export interface DayWeather {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  condition: {
    text: string;
    icon: string;
  };
}

export interface ForecastDay {
  date: string;
  day: DayWeather;
}

export default interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}
