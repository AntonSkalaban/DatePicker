import React, { useCallback } from "react";
import { useState } from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";
import { dateRangeValidation } from "utils/helpers/dateInputValidations";

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

      const removeFromDateError = useCallback(() => {
        setFromDate((prev) => ({ ...prev, errorMessage: "" }));
      }, []);

      const removeToDateError = useCallback(() => {
        setToDate((prev) => ({ ...prev, errorMessage: "" }));
      }, []);

      const hanldeFromSubmit = useCallback(
        (dateStr: string) => {
          const error = dateRangeValidation(dateStr, minDate, maxDate, dateStr, toDate.value);

          setFromDate({ value: dateStr, errorMessage: error || "" });

          if (!error && toDate.value) return onChange(dateStr, toDate.value);
        },
        [toDate.value],
      );

      const hanldeEndSubmit = useCallback(
        (dateStr: string) => {
          const error = dateRangeValidation(dateStr, minDate, maxDate, fromDate.value, dateStr);

          setToDate({ value: dateStr, errorMessage: error || "" });

          if (!error && fromDate.value) return onChange(fromDate.value, dateStr);
        },
        [fromDate.value],
      );

      return (
        <>
          <DateInput
            title="From date"
            value={dateRange.startDate}
            errorMessage={fromDate.errorMessage}
            onSubmit={hanldeFromSubmit}
            removeErrorMessage={removeFromDateError}
          />
          <DateInput
            title="To date"
            value={dateRange.endDate}
            errorMessage={toDate.errorMessage}
            onSubmit={hanldeEndSubmit}
            removeErrorMessage={removeToDateError}
          />
          <Component {...props} />
        </>
      );
    };
  };
