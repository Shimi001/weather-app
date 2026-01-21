import WeatherCircle from "./weatherComponents/WeatherCircle";
import WeatherInfo from "./weatherComponents/WeatherInfo";
import DayIndicator from "./weatherComponents/DayIndicator";

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
