import { DateGrid } from "utils/helpers/DateGrid";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarConfig, CalendarGrid } from "types";

interface Calendar {
  config: CalendarConfig;
  grid: CalendarGrid[][];
  getGrid(): CalendarGrid[][];
}

export class BaseCalendar implements Calendar {
  config: CalendarConfig;
  grid: CalendarGrid[][];

  constructor(config: CalendarConfig) {
    this.config = config;
    this.grid = DateGrid.createBaseGrid(this.config.openDate, this.config.isWeekStartFromSun);
  }
  getGrid() {
    return DateGrid.createBaseGrid(this.config.openDate, this.config.isWeekStartFromSun);
  }
}

export class WeekendsAndHolidaysDecorator {
  private calendar: Calendar;
  config: CalendarConfig;
  grid: CalendarGrid[][];

  constructor(calendar: Calendar) {
    this.calendar = calendar;
    this.config = calendar.config;
    this.grid = calendar.getGrid();
  }

  getGrid(): CalendarGrid[][] {
    // const grid = this.calendar.getGrid();

    return DateGrid.getWithHolidays(this.grid);
  }
}

export class TransitionByDateDecorator {
  private calendar;
  private selectDate;
  config: CalendarConfig;
  grid: CalendarGrid[][];

  constructor(calendar: Calendar, selectDate: Date) {
    this.calendar = calendar;
    this.selectDate = selectDate;
    this.config = calendar.config;
    this.grid = calendar.getGrid();
  }

  getGrid(): CalendarGrid[][] {
    // const calendarGrid = this.calendar.getGrid();
    return DateGrid.getWithSelectDate(this.grid, this.selectDate);
  }
}

export class DateRangeDecorator {
  private calendar;
  private startDate;
  private endDate;
  config: CalendarConfig;
  grid: CalendarGrid[][];

  constructor(calendar: Calendar, startDate: Date, endDate: Date) {
    this.calendar = calendar;
    this.startDate = startDate;
    this.endDate = endDate;
    this.config = calendar.config;
    this.grid = calendar.getGrid();
  }

  getGrid(): CalendarGrid[][] {
    // const calendarGrid = this.calendar.getGrid();

    return DateGrid.getWithRange(this.grid, this.startDate, this.endDate);
  }
}

export class CalendarServise {
  getCalendarGrid(config: CalendarConfig) {
    let calendar = new BaseCalendar(config);

    if (config.showWeekendsAndHoliday) {
      calendar = new WeekendsAndHolidaysDecorator(calendar);
    }

    if (config.withJumpByEnteredDate) {
      if (config.selectDate) {
        calendar = new TransitionByDateDecorator(calendar, dateStrToFullDate(config.selectDate));
      }
    }

    if (config.withDateRange) {
      if (config.dateRange.startDate && config.dateRange.endDate) {
        calendar = new DateRangeDecorator(
          calendar,
          dateStrToFullDate(config.dateRange.startDate),
          dateStrToFullDate(config.dateRange.endDate),
        );
      }
    }
    return calendar.getGrid();
  }
}
