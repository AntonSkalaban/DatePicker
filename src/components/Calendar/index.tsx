import React, { useState } from "react";
import { CalendarService } from "utils/services/calendarServeice";
import { CalendarConfig } from "types";
import { Dates } from "./Dates";
import { OpenMonth } from "./OpenMonth";
import { Weekdays } from "./Weekdays";
import { StyledCalendar } from "./styled";

interface CalendarProps {
  fromDate?: string;
  toDate?: string;
  isWeekStartFromSun?: boolean;
}

const dateStrToFullDate = (dateStr: string) => {
  const [dd, mm, yy] = dateStr.split("/").map((d) => +d);
  return new Date(yy, mm - 1, dd);
};

export const Calendar: React.FC<CalendarProps> = ({
  fromDate = "2020/09/05",
  toDate = "2025/09/05",
  isWeekStartFromSun = true,
}) => {
  const [openFullDate, setOpenFullDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const changeOpenMonth = (date: Date) => {
    setOpenFullDate(date);
  };

  const config: CalendarConfig = {
    fromDate: dateStrToFullDate(fromDate),
    toDate: dateStrToFullDate(toDate),
    isWeekStartFromSun,
    openDate: openFullDate,
  };

  const calendarService = new CalendarService(config);
  const calendar = calendarService.createCalendar();

  return (
    <>
      <StyledCalendar>
        <div>
          <OpenMonth openFullDate={openFullDate} changeOpenMonth={changeOpenMonth} />
          <Weekdays isWeekStartFromSun={isWeekStartFromSun} />
          <Dates openFullDate={openFullDate} dates={calendar} />
        </div>
      </StyledCalendar>
    </>
  );
};
