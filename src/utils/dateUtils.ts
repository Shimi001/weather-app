import { days } from "../data/days";

export const getThreeDaysConfig = () => {
  const date = new Date();
  const startDayIndex = date.getDay();

  return Array.from({ length: 3 }, (_, i) => {
    const dayIndex = (startDayIndex + i) % 7;
    return days[dayIndex];
  });
};
