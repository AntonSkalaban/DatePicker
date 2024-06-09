import { FC } from "react";

import { StyledContainerButton } from "styled";
import { DayCalendarProps } from "components/Calendar/DayView/DayCalendar/types";

export const withClearButton = (onClick: () => void) => (Component: FC<DayCalendarProps>) => {
  return (props: DayCalendarProps) => {
    const hanleCkick = () => {
      onClick();
    };

    return (
      <>
        <Component {...props} />
        <StyledContainerButton data-testid={"clear-button"} onClick={hanleCkick}>
          Clear
        </StyledContainerButton>
      </>
    );
  };
};
