import { Calendar } from "utils/services";
import { CalendarConfig, CalendarGrid } from "types";

export class SelectDateDecorator {
  private calendar;
  private selectDate;
  config: CalendarConfig = {} as CalendarConfig;

  constructor(calendar: Calendar, selectDate: Date) {
    this.calendar = calendar;
    this.selectDate = selectDate;
  }

  getGrid(): CalendarGrid[][] {
    const grid = this.calendar.getGrid();
    return SelectDateDecorator.getGridWithSelectDate(grid, this.selectDate);
  }

  static getGridWithSelectDate = (calendargrid: CalendarGrid[][], selectDate: Date) => {
    return calendargrid.map((week) => {
      return week.map((day) => ({
        ...day,
        isSelect: day.date.toDateString() === selectDate.toDateString(),
      }));
    });
  };
}
