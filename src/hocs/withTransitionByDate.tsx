import React from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";

export const withTransitionByDate =
  (onChange: (dateStr: string) => void, selectDate: string) =>
  (Component: React.FC<CalendarProps>) => {
    return (props: CalendarProps) => {
      const hanldeSubmit = (dateStr: string) => {
        onChange(dateStr);
      };

      return (
        <>
          <DateInput title="Open date" value={selectDate} onSubmit={hanldeSubmit} />
          <Component {...props} />
        </>
      );
    };
  };
