import React from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarService, TransitionByDateDecorator } from "utils/services/calendarServeice";
import { CalendarGrid } from "types/CalendarGrid";

export const withTransitionByDate =
  (
    calendar: CalendarService,
    changeOpenDate: (date: string, grid: CalendarGrid[][]) => void,
    selectDate: string,
  ) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const hanldeSubmit = (dateStr: string) => {
        const date = dateStrToFullDate(dateStr);
        const calendarDecorator = new TransitionByDateDecorator(calendar.calendar, date);
        const grid = calendarDecorator.createCalendarGrid(date, true);
        changeOpenDate(dateStr, grid);
      };

      return (
        <>
          <DateInput title="Open date" value={selectDate} onSubmit={hanldeSubmit} />
          <Component {...props} />
        </>
      );
    };
  };
