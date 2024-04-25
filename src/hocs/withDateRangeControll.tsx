import React from "react";
import { useState } from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarService, DateRangeDecorator } from "utils/services/calendarServeice";
import { CalendarGrid } from "types/CalendarGrid";

export const withDateRangeControll =
  (
    calendarService: CalendarService,
    onChange: (startDateStr: string, endDateStr: string, calendarGrid: CalendarGrid[][]) => void,
    dateRange: {
      startDate: string;
      endDate: string;
    },
  ) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const [fromDateStr, setFromDateStr] = useState(dateRange.startDate);
      const [toEndDateStr, setToDateStr] = useState(dateRange.endDate);

      const hanldeRangeSelect = (startDate: string, endDate: string) => {
        const calendarDecorator = new DateRangeDecorator(
          calendarService.calendar,
          dateStrToFullDate(startDate),
          dateStrToFullDate(endDate),
        );
        const grid = calendarDecorator.createCalendarGrid(dateStrToFullDate(startDate), true);
        onChange(startDate, endDate, grid);
      };

      const hanldeFromSubmit = (dateStr: string) => {
        setFromDateStr(dateStr);
        if (toEndDateStr) hanldeRangeSelect(dateStr, toEndDateStr);
      };

      const hanldeEndSubmit = (dateStr: string) => {
        setToDateStr(dateStr);
        if (fromDateStr) hanldeRangeSelect(fromDateStr, dateStr);
      };

      return (
        <>
          <DateInput title="From date" value={dateRange.startDate} onSubmit={hanldeFromSubmit} />
          <DateInput title="To date" value={dateRange.endDate} onSubmit={hanldeEndSubmit} />
          <Component {...props} />
        </>
      );
    };
  };
