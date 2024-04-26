import { holidays } from "constants/holidays";
import { CalendarGrid } from "types/CalendarGrid";
import {
  geStartDateOfPrevWeek,
  getDatesRange,
  getDaysInMonth,
  getNextMonth,
  getNextWeek,
  getPrevMonth,
  getPrevWeek,
} from "./helpers";

export class DateGrid {
  static createBaseGrid = (openDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][] => {
    const [yy, mm] = [openDate.getFullYear(), openDate.getMonth()];

    const firstDate = new Date(yy, mm);
    const daysInMonth = getDaysInMonth(openDate);

    const firstDayIndx = firstDate.getDay() - (isWeekStartFromSun ? 0 : 1);
    const lastDayIndx = new Date(yy, mm, daysInMonth).getDay() - (isWeekStartFromSun ? 0 : 1);

    const [prevYear, prevMonth] = getPrevMonth(yy, mm);
    const [nextYear, nextMonth] = getNextMonth(yy, mm);

    const startFullDateOfPrevWeek = geStartDateOfPrevWeek(prevYear, prevMonth, firstDayIndx);
    const startDateOfPrevWeek = startFullDateOfPrevWeek.getDate();

    const prevWeek = getPrevWeek(prevYear, prevMonth, startDateOfPrevWeek, firstDayIndx);
    const nextWeek = getNextWeek(nextYear, nextMonth, lastDayIndx);

    const dates = [prevWeek];

    for (let i = 1; i <= daysInMonth; i++) {
      const lastWeek = dates[dates.length - 1];
      const newDate = {
        date: new Date(yy, mm, i),
        isActive: false,
        rangeStatus: "",
        isHoliday: false,
      };

      if (lastWeek.length < 7) {
        lastWeek.push(newDate);
      } else {
        dates.push([newDate]);
      }
    }
    dates[dates.length - 1].push(...nextWeek);

    return dates as CalendarGrid[][];
  };

  static getWithSelectDate = (calendargrid: CalendarGrid[][], selectDate: Date) =>
    calendargrid.map((week) => {
      return week.map((day) => {
        return day.date.toDateString() === selectDate.toDateString()
          ? { ...day, isActive: true }
          : day;
      });
    });

  static getWithRange = (calendarGrid: CalendarGrid[][], startDate: Date, endDate: Date) => {
    const datesRange = getDatesRange(startDate, endDate).map((d) => d.toDateString());

    return calendarGrid.map((week) => {
      return week.map((day) => {
        const index = datesRange.indexOf(day.date.toDateString());

        if (index === 0) day.rangeStatus = "startRange";
        if (index > 0 && index < datesRange.length - 1) day.rangeStatus = "inRange";
        if (index === datesRange.length - 1) day.rangeStatus = "endRange";

        return day;
      });
    });
  };

  static getWithHolidays = (calendarGrid: CalendarGrid[][]) => {
    return calendarGrid.map((week) => {
      return week.map((day) => {
        const [dd, mm, ,] = day.date.toLocaleDateString("ru-RU").split(".");

        const dateStr = `${dd}-${mm}`;
        const isWeekend = day.date.getDay() >= 5;
        const isHoliday = !!holidays[dateStr];

        return isWeekend || isHoliday ? { ...day, isHoliday, isWeekend } : day;
      });
    });
  };
}
