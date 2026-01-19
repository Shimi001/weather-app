import { days } from "../../data/days";

function DayIndicator() {
  const currentDay = 0;
  const currentPos = 0;
  return (
    <div className="flex justify-center gap-4">
      {days.slice(currentDay, currentDay + 3).map((day, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index == currentPos
              ? `${day.color} scale-150`
              : `${day.color} scale-100`
          }`}
        />
      ))}
    </div>
  );
}

export default DayIndicator;
