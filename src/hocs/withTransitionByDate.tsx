import React, { useState } from "react";
import { CalendarProps, DateInput } from "components";
import { defaultDateInputValidation } from "utils";

export const withTransitionByDate =
  (changeOpenDate: (date: string) => void, selectDateStr: string, minDate: Date, maxDate: Date) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const [selectDate, setSelectDate] = useState({ value: selectDateStr, errorMessage: "" });

      const hanldeSubmit = (dateStr: string) => {
        setSelectDate({ value: dateStr, errorMessage: "" });
        if (dateStr.length < 10) return;

        const errorMessage = defaultDateInputValidation(dateStr, minDate, maxDate);
        if (errorMessage) return setSelectDate((prev) => ({ ...prev, errorMessage: errorMessage }));
        return changeOpenDate(dateStr);
      };

      return (
        <>
          <DateInput
            testId="date-select-input"
            title="Open date"
            value={selectDate.value}
            errorMessage={selectDate.errorMessage}
            onSubmit={hanldeSubmit}
          />
          <Component {...props} />
        </>
      );
    };
  };
