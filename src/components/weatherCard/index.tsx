import { useState } from "react";
import WeatherCircle from "./weatherComponents/WeatherCircle";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import DayIndicator from "./weatherComponents/DayIndicator";
import { getThreeDaysConfig } from "../../utils/dateUtils";
import { useWeather } from "../../hooks/useWeather";

function WeatherCard() {
  const [dayOffset, setDayoffset] = useState(0);

  const threeDays = getThreeDaysConfig();
  const currentDayConfig = threeDays[dayOffset];

  const { data, isLoading, error } = useWeather("Vienna");

  const handleNextDay = () => {
    setDayoffset((prev) => (prev < 2 ? prev + 1 : prev));
  };

  const handlePrevDay = () => {
    setDayoffset((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      <WeatherCircle
        weatherData={data ?? null}
        isLoading={isLoading}
        error={error}
        color={currentDayConfig.color}
        symbol={currentDayConfig.symbol}
        onNext={handleNextDay}
        onPrev={handlePrevDay}
      />
      <WeatherInfo />
      <DayIndicator />
    </div>
  );
}

export default WeatherCard;
