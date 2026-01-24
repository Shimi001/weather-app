interface NavArrowsProps {
  onNext: () => void;
  onPrev: () => void;
}

function NavArrows({ onNext, onPrev }: NavArrowsProps) {
  return (
    <>
      {/* left button */}
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/4 -translate-x-11 text-white/70 text-8xl"
      >
        ‹
      </button>
      {/* right button */}
      <button
        onClick={onNext}
        className="absolute right-0 top-1/4 translate-x-11 text-white/70 text-8xl"
      >
        ›
      </button>
    </>
  );
}

export default NavArrows;
