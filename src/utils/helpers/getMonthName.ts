import { months } from "constants/months";

export const getMonthName = (date: Date) => {
  const monthIndex = date.getMonth();

  return `${months[monthIndex]}`;
};
