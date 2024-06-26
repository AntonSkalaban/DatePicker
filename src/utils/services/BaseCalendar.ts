import {
  getDaysInMonth,
  getNextMonth,
  getNextWeek,
  getPrevMonth,
  getPrevWeek,
  getStartDateOfPrevWeek,
} from "utils/helpers";
import { CalendarConfig, CalendarGrid } from "types";

export interface Calendar {
  config: CalendarConfig;
  getGrid(): CalendarGrid[][];
}

export class BaseCalendar implements Calendar {
  config: CalendarConfig;

  constructor(config: CalendarConfig) {
    this.config = config;
  }
  getGrid() {
    return BaseCalendar.createBaseGrid(this.config.openDate, this.config.isWeekStartFromSun);
  }

  static createBaseGrid = (currendDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][] => {
    const [yy, mm] = [currendDate.getFullYear(), currendDate.getMonth()];

    const firstDate = new Date(yy, mm);
    const daysInMonth = getDaysInMonth(currendDate);

    const weekday = firstDate.getDay();

    const firstDayIndx = isWeekStartFromSun ? weekday : weekday + (weekday ? -1 : 6);

    const [prevYear, prevMonth] = getPrevMonth(yy, mm);

    const startFullDateOfPrevWeek = getStartDateOfPrevWeek(prevYear, prevMonth, firstDayIndx);
    const startDateOfPrevWeek = startFullDateOfPrevWeek.getDate();

    const prevWeek = getPrevWeek(prevYear, prevMonth, startDateOfPrevWeek, firstDayIndx);

    const dates = [prevWeek];

    for (let i = 1; i <= daysInMonth; i++) {
      const lastWeek = dates[dates.length - 1];
      const newDate = {
        date: new Date(yy, mm, i),
        isSelect: false,
        rangeStatus: "",
        isHoliday: false,
        isWeekend: false,
      };

      if (lastWeek.length < 7) {
        lastWeek.push(newDate);
      } else {
        dates.push([newDate]);
      }
    }

    if (dates[dates.length - 1].length < 7) {
      const [nextYear, nextMonth] = getNextMonth(yy, mm);
      const lastDayIndx = new Date(yy, mm, daysInMonth).getDay() - (isWeekStartFromSun ? 0 : 1);

      const nextWeek = getNextWeek(nextYear, nextMonth, lastDayIndx);
      dates[dates.length - 1].push(...nextWeek);
    }

    return dates as CalendarGrid[][];
  };
}
