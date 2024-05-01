import { months } from "constants/months";

export const getMonthName = (date: Date) => {
  const monthIndex = date.getMonth();

  return `${months[monthIndex]}`;
};

export const getDaysInMonth = function (date: Date) {
  return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
};

export const getPrevMonth = (curYear: number, curMonth: number) => {
  const prevYear = curMonth ? curYear : curYear - 1;
  const prevMonth = curMonth ? curMonth - 1 : 11;
  return [prevYear, prevMonth];
};

export const getNextMonth = (curYear: number, curMonth: number) => {
  const nextYear = curMonth !== 11 ? curYear : curYear + 1;
  const nextMonth = curMonth !== 11 ? curMonth + 1 : 0;
  return [nextYear, nextMonth];
};
