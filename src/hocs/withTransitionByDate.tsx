import React, { useCallback, useState } from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";
import { defaultDateInputValidation } from "utils/helpers/dateInputValidations";

export const withTransitionByDate =
  (changeOpenDate: (date: string) => void, selectDateStr: string, minDate: Date, maxDate: Date) =>
  (Component: React.FC<CalendarProps>) => {
    const [selectDate, setSelectDate] = useState({ value: selectDateStr, errorMessage: "" });

    return (props: CalendarProps) => {
      const removeToDateError = useCallback(() => {
        setSelectDate((prev) => ({ ...prev, errorMessage: "" }));
      }, []);

      const hanldeSubmit = useCallback((dateStr: string) => {
        const errorMessage = defaultDateInputValidation(dateStr, minDate, maxDate);

        setSelectDate({ value: dateStr, errorMessage: errorMessage || "" });

        if (!errorMessage) changeOpenDate(dateStr);
      }, []);

      return (
        <>
          <DateInput
            title="Open date"
            value={selectDate.value}
            errorMessage={selectDate.errorMessage}
            removeErrorMessage={removeToDateError}
            onSubmit={hanldeSubmit}
          />
          <Component {...props} />
        </>
      );
    };
  };
