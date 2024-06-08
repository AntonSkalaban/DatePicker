import { weekdays } from "constants/index";

import { getDaysInMonth } from "./month";

export const getWeekdays = (isWeekStartFromSun: boolean) => {
  if (isWeekStartFromSun) return weekdays;
  else {
    const newWeekdays = [...weekdays];
    newWeekdays.shift();
    return [...newWeekdays, "Su"];
  }
};

export const getStartDateOfPrevWeek = (
  prevYear: number,
  prevMonth: number,
  firstDayIndx: number,
) => {
  const dayisInPrevMonth = getDaysInMonth(new Date(prevYear, prevMonth));
  const startDateOfPrevMonth = dayisInPrevMonth - firstDayIndx + 1;

  return new Date(prevYear, prevMonth, startDateOfPrevMonth);
};

export const getPrevWeek = (
  prevYear: number,
  prevMonth: number,
  startDateOfPrevWeek: number,
  firstDayIndx: number,
) => {
  return Array.from({ length: firstDayIndx }).map((_, i) => {
    return {
      date: new Date(prevYear, prevMonth, startDateOfPrevWeek + i),
      isSelect: false,
      rangeStatus: "",
      isHoliday: false,
      isWeekend: false,
    };
  });
};

export const getNextWeek = (nextYear: number, nextMonth: number, lastDayIndx: number) => {
  return Array.from({ length: 7 - lastDayIndx - 1 }).map((_, i) => {
    return {
      date: new Date(nextYear, nextMonth, i + 1),
      isSelect: false,
      rangeStatus: "",
      isHoliday: false,
      isWeekend: false,
    };
  });
};
