import React, { useState } from "react";
import { CalendarProps, DateInput } from "components";
import { dateRangeValidation } from "utils";

export const withDateRangeControll =
  (
    onChange: (startDateStr: string, endDateStr: string) => void,
    dateRange: {
      startDate: string;
      endDate: string;
    },
    minDate: Date,
    maxDate: Date,
  ) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const [fromDate, setFromDate] = useState({ value: dateRange.startDate, errorMessage: "" });
      const [toDate, setToDate] = useState({ value: dateRange.endDate, errorMessage: "" });

      const hanldeFromSubmit = (dateStr: string) => {
        setFromDate({ value: dateStr, errorMessage: "" });

        if (dateStr.length < 10) return;
        const error = dateRangeValidation(dateStr, minDate, maxDate, dateStr, toDate.value);
        if (error) return setFromDate((prev) => ({ ...prev, errorMessage: error }));
        if (!error && toDate.value) return onChange(dateStr, toDate.value);
      };

      const hanldeEndSubmit = (dateStr: string) => {
        setToDate({ value: dateStr, errorMessage: "" });

        if (dateStr.length < 10) return;
        const error = dateRangeValidation(dateStr, minDate, maxDate, fromDate.value, dateStr);
        if (error) return setToDate((prev) => ({ ...prev, errorMessage: error }));
        if (!error && fromDate.value) return onChange(fromDate.value, dateStr);
      };

      return (
        <>
          <DateInput
            title="From date"
            testId="date-range-from-input"
            value={fromDate.value}
            errorMessage={fromDate.errorMessage}
            onSubmit={hanldeFromSubmit}
          />
          <DateInput
            title="To date"
            testId="date-range-to-input"
            value={toDate.value}
            errorMessage={toDate.errorMessage}
            onSubmit={hanldeEndSubmit}
          />
          <Component {...props} />
        </>
      );
    };
  };
