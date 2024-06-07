import { FC } from "react";

import { StyledContainer } from "styled";

import { Dates } from "./Dates";
import { Title } from "./Title";
import { CalendarProps } from "./types";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export const Calendar: FC<CalendarProps> = ({ calendarGrid, changeOpenFullDate, withClearBtn }) => {
  return (
    <CalendarWrapper id="calendar-wrapper">
      <StyledContainer $withBtn={withClearBtn}>
        <Title changeOpenMonth={changeOpenFullDate} />
        <Weekdays />
        <Dates dates={calendarGrid} />
      </StyledContainer>
    </CalendarWrapper>
  );
};
