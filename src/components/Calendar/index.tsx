import React from "react";
import { CalendarGrid } from "types/CalendarGrid";
import { Dates } from "./Dates";
import { OpenMonth } from "./OpenMonth";
import { Weekdays } from "./Weekdays";
import { StyledCalendar } from "./styled";

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
    <StyledCalendar $withBtn={withClearBtn}>
      <div>
        <OpenMonth openFullDate={openDate} changeOpenMonth={changeOpenFullDate} />
        <Weekdays isWeekStartFromSun={isWeekStartFromSun} />
        <Dates openFullDate={openDate} dates={calendarGrid} widthTodo={widthTodo} />
      </div>
    </StyledCalendar>
  );
};
