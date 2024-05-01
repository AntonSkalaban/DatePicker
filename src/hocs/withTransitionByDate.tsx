import React, { useContext, useState } from "react";
import { CalendarProps, ConfigContext, DateInput } from "components";
import { defaultDateInputValidation } from "utils";

export const withTransitionByDate =
  (changeOpenDate: (date: string) => void) => (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const { minDate, maxDate, selectDate } = useContext(ConfigContext);
      const [dateInput, setDateInput] = useState({
        value: selectDate,
        errorMessage: "",
      });

      const hanldeSubmit = (dateStr: string) => {
        setDateInput({ value: dateStr, errorMessage: "" });
        if (dateStr.length < 10) return;

        const errorMessage = defaultDateInputValidation(dateStr, minDate, maxDate);
        if (errorMessage) return setDateInput((prev) => ({ ...prev, errorMessage: errorMessage }));
        return changeOpenDate(dateStr);
      };

      return (
        <>
          <DateInput
            testId="date-select-input"
            title="Open date"
            value={dateInput.value}
            errorMessage={dateInput.errorMessage}
            onSubmit={hanldeSubmit}
          />
          <Component {...props} />
        </>
      );
    };
  };
