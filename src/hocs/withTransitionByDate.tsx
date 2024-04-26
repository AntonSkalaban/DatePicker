import React, { useCallback } from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";

export const withTransitionByDate =
  (changeOpenDate: (date: string) => void, selectDate: string) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const hanldeSubmit = useCallback((dateStr: string) => {
        changeOpenDate(dateStr);
      }, []);

      return (
        <>
          <DateInput title="Open date" value={selectDate} onSubmit={hanldeSubmit} />
          <Component {...props} />
        </>
      );
    };
  };
