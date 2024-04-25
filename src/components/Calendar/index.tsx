import React from "react";
import { StyledContainer } from "components/styled/StyledComponetns";
import { CalendarGrid } from "types/CalendarGrid";
import { Dates } from "./Dates";
import { OpenMonth } from "./OpenMonth";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export interface CalendarProps {
  calendarGrid: CalendarGrid[][];
  openDate: Date;
  isWeekStartFromSun: boolean;
  widthTodo: boolean;
  changeOpenFullDate: (date: Date) => void;
  withClearBtn: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  isWeekStartFromSun = true,
  openDate,
  calendarGrid,
  widthTodo,
  changeOpenFullDate,
  withClearBtn,
}) => {
  return (
    <CalendarWrapper id="calendar-wrapper">
      <StyledContainer $withBtn={withClearBtn}>
        <OpenMonth openFullDate={openDate} changeOpenMonth={changeOpenFullDate} />
        <Weekdays isWeekStartFromSun={isWeekStartFromSun} />
        <Dates openFullDate={openDate} dates={calendarGrid} widthTodo={widthTodo} />
      </StyledContainer>
    </CalendarWrapper>
  );
};
