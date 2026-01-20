import NavArrows from "./NavArrows";

function WeatherCircle() {
  return (
    <div className="mx-auto relative">
      <NavArrows />
      <div className="bg-white w-64 h-64 rounded-full relative">
        {/* -translate-x-6 = 2 digits, -translate-x-3 = 1 digit */}
        <div className="absolute top-1/4 left-1/2 -translate-x-6 -translate-y-5">
          <span className="text-5xl">00°</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-7 translate-y-1">
          <span className="text-5xl">☀️</span>
        </div>
        <div className="absolute top-1/2 right-1 -translate-x-5 -translate-y-11">
          <div className="flex flex-col text-xl">
            <span>月</span>
            <span>曜</span>
            <span>日</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCircle;
