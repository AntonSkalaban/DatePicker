import React from "react";
import { CalendarProps } from "components/Calendar";
import { DateInput } from "components/DateInput";

export const withTransitionByDate =
  (onChange: (dateStr: string) => void) => (Component: React.FC<CalendarProps>) => {
    // eslint-disable-next-line react/display-name
    return (props: CalendarProps) => {
      const hanldeSubmit = (dateStr: string) => {
        onChange(dateStr);
      };

      return (
        <>
          <DateInput title="Open date" onSubmit={hanldeSubmit} />
          <Component {...props} />
        </>
      );
    };
  };
