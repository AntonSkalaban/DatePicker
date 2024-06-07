import { FC } from "react";

import { StyledContainerButton } from "styled";
import { CalendarProps } from "components/Calendar/types";

export const withClearButton = (onClick: () => void) => (Component: FC<CalendarProps>) => {
  return (props: CalendarProps) => {
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
