import WeatherCircle from "./WeatherCircle";
import WeatherInfo from "./WeatherInfo";

function WeatherCard() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <WeatherCircle />
      <WeatherInfo />
    </div>
  );
}

export default WeatherCard;
