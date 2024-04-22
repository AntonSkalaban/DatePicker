import React, { useLayoutEffect, useState } from "react";
import { weekdays } from "constants/index";
import { CalendarService } from "utils/services/calendarServeice";
import { CalendarConfig } from "types";
import { OpenMonth } from "./OpenMonth";
import { CalendarButton, StyledCalendar } from "./styled";

interface CalendarProps {
  fromDate?: string;
  toDate?: string;
  isWeekStartFromSun?: boolean;
}

const getWeekdays = (isWeekStartFromSun: boolean) => {
  if (isWeekStartFromSun) return weekdays;
  else {
    weekdays.shift();
    return [...weekdays, "Sun"];
  }
};

const dateStrToFullDate = (dateStr: string) => {
  const [dd, mm, yy] = dateStr.split("/").map((d) => +d);
  return new Date(yy, mm - 1, dd);
};

export const Calendar: React.FC<CalendarProps> = ({
  fromDate = "2020/09/05",
  toDate = "2025/09/05",
  isWeekStartFromSun = true,
}) => {
  const [weekdays, setWeekdays] = useState([] as string[]);

  useLayoutEffect(() => {
    setWeekdays(getWeekdays(isWeekStartFromSun));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div style={{ display: "flex" }}>
            {weekdays.map((day) => (
              <span
                key={day}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                }}
              >
                {day}
              </span>
            ))}
          </div>
          <div>
            {calendar.map((week, index) => (
              <div key={index}>
                {week.map((date) => (
                  <CalendarButton
                    $isActive={date.getMonth() === openFullDate.getMonth()}
                    key={date.toDateString()}
                    style={{ width: "32px", height: "32px" }}
                  >
                    {date.getDate()}
                  </CalendarButton>
                ))}
              </div>
            ))}
          </div>
        </div>
      </StyledCalendar>
    </>
  );
};
