import React from "react";
import { StyledContainer } from "styled";
import { CalendarGrid } from "types";
import { Dates } from "./Dates";
import { Title } from "./Title";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export interface CalendarProps {
  calendarGrid: CalendarGrid[][];
  changeOpenFullDate: (date: Date) => void;
  withClearBtn: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  calendarGrid,
  changeOpenFullDate,
  withClearBtn,
}) => {
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
