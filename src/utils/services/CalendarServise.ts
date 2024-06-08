import {
  dateStrToFullDate,
  RangeDateDecorator,
  SelectDateDecorator,
  TodoDecorator,
  WeekendsAndHolidaysDecorator,
} from "utils";
import { CalendarConfig } from "types";

import { BaseCalendar } from "./BaseCalendar";

export class CalendarServise {
  getCalendarGrid(config: CalendarConfig) {
    let calendar = new BaseCalendar(config);

    if (config.showWeekendsAndHoliday) {
      calendar = new WeekendsAndHolidaysDecorator(calendar);
    }

    if (config.withDateSelect) {
      if (config.selectDate) {
        calendar = new SelectDateDecorator(calendar, dateStrToFullDate(config.selectDate));
      }
    }

    if (config.withDateRange) {
      if (config.dateRange.startDate && config.dateRange.endDate) {
        calendar = new RangeDateDecorator(
          calendar,
          dateStrToFullDate(config.dateRange.startDate),
          dateStrToFullDate(config.dateRange.endDate),
        );
      }
    }

    if (config.withTodo) {
      calendar = new TodoDecorator(calendar, config.todos);
    }
    return calendar.getGrid();
  }
}
