import {
  RangeDateDecorator,
  SelectDateDecorator,
  WeekendsAndHolidaysDecorator,
} from "utils/decorators";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarConfig } from "types";
import { BaseCalendar } from "./BaseCalendar";

export class CalendarServise {
  getCalendarGrid(config: CalendarConfig) {
    let calendar = new BaseCalendar(config);

    if (config.showWeekendsAndHoliday) {
      calendar = new WeekendsAndHolidaysDecorator(calendar);
    }

    if (config.withJumpByEnteredDate) {
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
    return calendar.getGrid();
  }
}
