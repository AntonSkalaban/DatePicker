import { FC, useContext, useState } from "react";

import { ConfigContext } from "context";
import { DateInput } from "components/Calendar/DayView/DayCalendar/DateInput";
import { DayCalendarProps } from "components/Calendar/DayView/DayCalendar/types";
import { defaultDateInputValidation } from "utils";

export const withTransitionByDate =
  (selectDate: string, changeOpenDate: (date: string) => void) =>
  (Component: FC<DayCalendarProps>) => {
    return (props: DayCalendarProps) => {
      const { minDate, maxDate } = useContext(ConfigContext);
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
