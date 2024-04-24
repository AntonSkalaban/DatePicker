import React from "react";
import { CalendarProps } from "components/Calendar";

export const withClearBtn = (onClick: () => void) => (Component: React.FC<CalendarProps>) => {
  return (props: CalendarProps) => {
    const hanleCkick = () => {
      onClick();
    };

    return (
      <>
        <Component {...props} />
        <button onClick={hanleCkick}>Clear</button>
      </>
    );
  };
};
