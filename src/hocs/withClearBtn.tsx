import React from "react";
import { CalendarProps } from "components/Calendar";
import { ClearButton } from "./styled";

export const withClearBtn = (onClick: () => void) => (Component: React.FC<CalendarProps>) => {
  return (props: CalendarProps) => {
    const hanleCkick = () => {
      onClick();
    };

    return (
      <>
        <Component {...props} />
        <ClearButton onClick={hanleCkick}>Clear</ClearButton>
      </>
    );
  };
};
