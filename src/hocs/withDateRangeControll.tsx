import React from "react";
import { useState } from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";

export const withDateRangeControll =
  (
    onChange: (startDateStr: string, endDateStr: string) => void,
    dateRange: {
      startDate: string;
      endDate: string;
    },
  ) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const [fromDateStr, setFromDateStr] = useState(dateRange.startDate);
      const [toEndDateStr, setToDateStr] = useState(dateRange.endDate);

      const hanldeFromSubmit = (dateStr: string) => {
        setFromDateStr(dateStr);
        if (toEndDateStr) onChange(dateStr, toEndDateStr);
      };

      const hanldeEndSubmit = (dateStr: string) => {
        setToDateStr(dateStr);
        if (fromDateStr) onChange(fromDateStr, dateStr);
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
