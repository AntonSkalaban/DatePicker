import { getDatesRange } from "utils/helpers";
import { Calendar } from "utils/services";
import { CalendarConfig, CalendarGrid } from "types";

export class RangeDateDecorator {
  private calendar;
  private startDate;
  private endDate;
  config: CalendarConfig = {} as CalendarConfig;

  constructor(calendar: Calendar, startDate: Date, endDate: Date) {
    this.calendar = calendar;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getGrid(): CalendarGrid[][] {
    const grid = this.calendar.getGrid();

    return RangeDateDecorator.getGridWithRange(grid, this.startDate, this.endDate);
  }

  static getGridWithRange = (calendarGrid: CalendarGrid[][], startDate: Date, endDate: Date) => {
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
}
