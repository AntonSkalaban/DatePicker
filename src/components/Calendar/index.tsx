import React, { useState } from "react";
import { Dates } from "./Dates";
import { OpenMonth } from "./OpenMonth";
import { Weekdays } from "./Weekdays";
import { StyledCalendar } from "./styled";

export interface CalendarProps {
  calendarGrid: {
    date: Date;
    isActive: boolean;
  }[][];
  openDate: Date;
  isWeekStartFromSun?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  isWeekStartFromSun = true,
  openDate,
  calendarGrid,
}) => {
  const [openFullDate, setOpenFullDate] = useState(openDate);

  const changeOpenMonth = (date: Date) => {
    setOpenFullDate(date);
  };

  return (
    <StyledCalendar>
      <div>
        <OpenMonth openFullDate={openFullDate} changeOpenMonth={changeOpenMonth} />
        <Weekdays isWeekStartFromSun={isWeekStartFromSun} />
        <Dates openFullDate={openFullDate} dates={calendarGrid} />
      </div>
    </StyledCalendar>
  );
};
