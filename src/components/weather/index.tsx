import WeatherCircle from "./WeatherCircle";
import WeatherInfo from "./WeatherInfo";
import DayIndicator from "./DayIndicator";

function WeatherCard() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <WeatherCircle />
      <WeatherInfo />
      <DayIndicator />
    </div>
  );
}

export default WeatherCard;
