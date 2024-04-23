import {
  dateStrToFullDate,
  geStartDateOfPrevWeek,
  getDaysInMonth,
  getNextMonth,
  getNextWeek,
  getPrevMonth,
  getPrevWeek,
} from "utils/helpers/helpers";
import { CalendarConfig, CalendarGrid } from "types";

interface Calendar {
  createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][];
}

export class CalendarService {
  calendar: Calendar;
  private config: CalendarConfig;

  constructor(config: CalendarConfig) {
    this.config = config;
    this.calendar = new BaseCalendar();
    if (config.withJumpByEnteredDate) this.calendar = new TransitionByDateDecorator(this.calendar);
  }

  createCalendar(): CalendarGrid[][] {
    return this.calendar.createCalendarGrid(this.config.openDate, this.config.isWeekStartFromSun);
  }
}

export class BaseCalendar implements Calendar {
  createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean) {
    const [yy, mm] = [openDate.getFullYear(), openDate.getMonth()];
    const daysInMonth = getDaysInMonth(openDate);

    const firstDayIndx = openDate.getDay() - (isWeekStartFromSun ? 0 : 1);
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
      const newDate = { date: new Date(yy, mm, i), isActive: false };

      if (lastWeek.length < 7) {
        lastWeek.push(newDate);
      } else {
        dates.push([newDate]);
      }
    }
    dates[dates.length - 1].push(...nextWeek);

    return dates;
  }
}

export class TransitionByDateDecorator {
  private calendar;

  constructor(calendar: BaseCalendar) {
    this.calendar = calendar;
  }

  createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][] {
    return this.calendar.createCalendarGrid(openDate, isWeekStartFromSun);
  }

  jumpByEnteredDateDecorator(dateStr: string, isWeekStartFromSun: boolean) {
    const date = dateStrToFullDate(dateStr);
    const calendargrid = this.calendar.createCalendarGrid(date, isWeekStartFromSun);
    const jumpedCalendarGrid = calendargrid.map((week) => {
      return week.map((day) => {
        if (day.date.toDateString() === date.toDateString()) {
          day.isActive = true;
        }
        return day;
      });
    });

    return jumpedCalendarGrid;
  }
}

// export class DateRangeDecorator {
//   private calendar;

//   constructor(calendar: BaseCalendar) {
//     this.calendar = calendar;
//   }

//   createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][] {
//     return this.calendar.createCalendarGrid(openDate, isWeekStartFromSun);
//   }

//   getDateRange(startDate: string, endDate: string, isWeekStartFromSun: boolean) {
//     const startFullDate = dateStrToFullDate(startDate);
//     const endFullDate = dateStrToFullDate(endDate);

//     const calendarGrid = this.calendar.createCalendarGrid(startFullDate, isWeekStartFromSun);

//     const rangedCalendarGrid = calendarGrid.map((week) => {
//       return week.map((day) => {
//         if (day.date.toDateString() === date.toDateString()) {
//           day.isActive = true;
//         }
//         return day;
//       });
//     });

//     return jumpedCalendarGrid;
//   }
// }
