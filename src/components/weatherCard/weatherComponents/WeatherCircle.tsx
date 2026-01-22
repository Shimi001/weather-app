import NavArrows from "./NavArrows";
import { useWeather } from "../../../hooks/useWeather";

function WeatherCircle() {
  const { data, isLoading, error } = useWeather("Vienna");

  console.log("response body:", data);
  console.log("loading condition:", isLoading);
  console.log("error:", error);

  return (
    <div className="mx-auto relative">
      <NavArrows />

      <div className="bg-white w-64 h-64 rounded-full relative">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center animate-pulse">
            <span className="text-2xl font-bold">Error</span>
            <span className="text-sm">{error.message}</span>
          </div>
        ) : (
          <>
            {/* -translate-x-6 = 2 digits, -translate-x-3 = 1 digit */}
            <div className="absolute top-1/4 left-1/2 -translate-x-6 -translate-y-5">
              {isLoading ? (
                <div className="h-14 w-14 bg-gray-300 rounded-xl animate-pulse"></div>
              ) : (
                <span className="text-5xl">
                  {Math.round(data?.current.temp_c ?? 0)}°
                </span>
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-7 translate-y-1">
              {isLoading ? (
                <div className="h-14 w-14 bg-gray-300 rounded-full animate-pulse"></div>
              ) : (
                <img
                  src={data?.current.condition.icon}
                  alt={`${data?.current.condition.text || "Weather"} icon`}
                  className="text-5xl"
                />
              )}
            </div>
            <div className="absolute top-1/2 right-1 -translate-x-5 -translate-y-11">
              {isLoading ? (
                <div className="h-21 w-5 bg-gray-300 rounded-xl animate-pulse"></div>
              ) : (
                <div className="flex flex-col text-xl">
                  <span>月</span>
                  <span>曜</span>
                  <span>日</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherCircle;
