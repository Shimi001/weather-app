import { useWeatherStore } from "../../../store/weatherStore";

function NavArrows() {
  const { incrementDay, decrementDay, dayOffset } = useWeatherStore();

  return (
    <>
      {/* left button */}
      <button
        onClick={decrementDay}
        disabled={dayOffset === 0}
        className="absolute left-0 top-1/4 -translate-x-11 text-white/70 text-8xl"
      >
        ‹
      </button>
      {/* right button */}
      <button
        onClick={incrementDay}
        disabled={dayOffset === 2}
        className="absolute right-0 top-1/4 translate-x-11 text-white/70 text-8xl"
      >
        ›
      </button>
    </>
  );
}

export default NavArrows;
