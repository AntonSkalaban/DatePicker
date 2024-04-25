import { DateGrid } from "utils/helpers/DateGrid";
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
    // if (config.withJumpByEnteredDate) this.calendar = new TransitionByDateDecorator(this.calendar);
    // if (config.withDateRange) this.calendar = new DateRangeDecorator(this.calendar);
  }

  createCalendar(openDate: Date): CalendarGrid[][] {
    return this.calendar.createCalendarGrid(openDate, this.config.isWeekStartFromSun);
  }
}

export class BaseCalendar implements Calendar {
  createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean) {
    return DateGrid.createBaseGrid(openDate, isWeekStartFromSun);
  }
}

export class TransitionByDateDecorator {
  private calendar;
  private selectDate;

  constructor(calendar: BaseCalendar, selectDate: Date) {
    this.calendar = calendar;
    this.selectDate = selectDate;
  }

  createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][] {
    const calendarGrid = this.calendar.createCalendarGrid(openDate, isWeekStartFromSun);
    return DateGrid.getWithSelectDate(calendarGrid, this.selectDate);
  }

  // jumpByEnteredDate(selectDate: Date, isWeekStartFromSun: boolean) {
  //   const calendarGrid = this.calendar.createCalendarGrid(selectDate, isWeekStartFromSun);

  //   return DateGrid.getWithSelectDate(calendarGrid, selectDate);
}

export class DateRangeDecorator {
  private calendar;
  private startDate;
  private endDate;
  constructor(calendar: BaseCalendar, startDate: Date, endDate: Date) {
    this.calendar = calendar;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  createCalendarGrid(openDate: Date, isWeekStartFromSun: boolean): CalendarGrid[][] {
    const calendarGrid = this.calendar.createCalendarGrid(openDate, isWeekStartFromSun);

    return DateGrid.getWithRange(calendarGrid, this.startDate, this.endDate);
  }

  // getDateRangeGrid(startDate: Date, endDate: Date, isWeekStartFromSun: boolean) {
  //   const calendarGrid = this.calendar.createCalendarGrid(startDate, isWeekStartFromSun);

  //   return DateGrid.getWithRange(calendarGrid, startDate, endDate);
  // }
}
