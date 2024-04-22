import {
  geStartDateOfPrevWeek,
  getDaysInMonth,
  getNextMonth,
  getNextWeek,
  getPrevMonth,
  getPrevWeek,
} from "utils/helpers/helpers";
import { CalendarConfig } from "types";

export class CalendarService {
  private config: CalendarConfig;

  constructor(config: CalendarConfig) {
    this.config = config;
  }

  public createCalendar() {
    const calendar = new BaseCalendar(this.config).createCalendar();

    //     // Добавить дополнительные функциональные возможности с помощью декораторов
    //     if (config.isEventRemindersEnabled()) {
    //         calendar = new ReminderDecorator(calendar);
    //     }
    //     if (config.isSharingEnabled()) {
    //         calendar = new SharingDecorator(calendar);
    //     }

    return calendar;
    // }
  }
}
export class BaseCalendar {
  private config;

  constructor(config: CalendarConfig) {
    this.config = config;
  }

  createCalendar() {
    const { openDate, isWeekStartFromSun } = this.config;

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
      const newDate = new Date(yy, mm, i);

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
