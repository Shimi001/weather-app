import { useWeatherStore } from "../../../store/weatherStore";

function NavArrows() {
  const { incrementDay, decrementDay } = useWeatherStore();

  return (
    <>
      {/* left button */}
      <button
        onClick={decrementDay}
        className="absolute left-0 top-1/4 -translate-x-11 text-white/70 text-8xl"
      >
        ‹
      </button>
      {/* right button */}
      <button
        onClick={incrementDay}
        className="absolute right-0 top-1/4 translate-x-11 text-white/70 text-8xl"
      >
        ›
      </button>
    </>
  );
}

export default NavArrows;
