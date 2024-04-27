import { weekdays } from "constants/index";

export const getDaysInMonth = function (date: Date) {
  return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
};

export const getDDMMYYFromDate = (date: Date) => {
  return date.toLocaleDateString("ru-RU").split(".");
};

export const dateStrToFullDate = (dateStr: string) => {
  const [dd, mm, yy] = dateStr.split("/").map(Number);
  return new Date(yy, mm - 1, dd);
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

export const geStartDateOfPrevWeek = (
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

export const getWeekdays = (isWeekStartFromSun: boolean) => {
  if (isWeekStartFromSun) return weekdays;
  else {
    const newWeekdays = [...weekdays];
    newWeekdays.shift();
    return [...newWeekdays, "Sun"];
  }
};

export const getDatesRange = (startDate: Date, endDate: Date) => {
  const datesArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
};
