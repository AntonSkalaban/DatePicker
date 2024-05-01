import React from "react";
import { StyledContainer } from "styled";
import { CalendarGrid } from "types";
import { Dates } from "./Dates";
import { Title } from "./Title";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export interface CalendarProps {
  calendarGrid: CalendarGrid[][];
  openDate: Date;
  isWeekStartFromSun: boolean;
  widthTodo: boolean;
  changeOpenFullDate: (date: Date) => void;
  withClearBtn: boolean;
  holidayColor: "red" | "blue" | "green";
}

export const Calendar: React.FC<CalendarProps> = ({
  isWeekStartFromSun = true,
  openDate,
  calendarGrid,
  widthTodo,
  changeOpenFullDate,
  withClearBtn,
  holidayColor,
}) => {
  return (
    <CalendarWrapper id="calendar-wrapper">
      <StyledContainer $withBtn={withClearBtn}>
        <Title openDate={openDate} changeOpenMonth={changeOpenFullDate} />
        <Weekdays isWeekStartFromSun={isWeekStartFromSun} />
        <Dates
          openDate={openDate}
          dates={calendarGrid}
          widthTodo={widthTodo}
          holidayColor={holidayColor}
        />
      </StyledContainer>
    </CalendarWrapper>
  );
};
