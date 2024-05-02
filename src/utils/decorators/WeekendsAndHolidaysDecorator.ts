import { holidays } from "constants/index";
import { getDDMMYYFromDate } from "utils/helpers";
import { Calendar } from "utils/services";
import { CalendarConfig, CalendarGrid } from "types";

export class WeekendsAndHolidaysDecorator {
  private calendar: Calendar;
  config: CalendarConfig = {} as CalendarConfig;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  getGrid(): CalendarGrid[][] {
    const grid = this.calendar.getGrid();
    return WeekendsAndHolidaysDecorator.getGridWithHolidays(grid);
  }

  static getGridWithHolidays = (calendarGrid: CalendarGrid[][]) => {
    return calendarGrid.map((week) => {
      return week.map((day) => {
        const [dd, mm, ,] = getDDMMYYFromDate(day.date);

        const dateStr = `${dd}-${mm}`;
        const isWeekend = day.date.getDay() >= 5;
        const isHoliday = !!holidays[dateStr];

        return isWeekend || isHoliday ? { ...day, isHoliday, isWeekend } : day;
      });
    });
  };
}
