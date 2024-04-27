import React, { useState } from "react";
import { TextInput } from "components/TextInput";
import { CalendarGrid } from "types/CalendarGrid";
import { CalendarButton } from "./styled";

interface DatesProps {
  openFullDate: Date;
  dates: CalendarGrid[][];
  widthTodo: boolean;
  holidayColor: "red" | "green" | "blue";
}

export const Dates: React.FC<DatesProps> = ({ openFullDate, dates, widthTodo, holidayColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDate, setOpenDate] = useState("");

  const hanleClick = (date: Date) => () => {
    if (!widthTodo) return;
    setIsOpen(true);
    setOpenDate(date.toUTCString());
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextInput isOpen={isOpen} onClose={hanldeClose} date={openDate} />
      {dates.map((week, index) => (
        <div key={index}>
          {week.map(({ date, isSelect, rangeStatus, isHoliday, isWeekend }) => (
            <CalendarButton
              onClick={hanleClick(date)}
              key={date.toDateString()}
              $isActive={date.getMonth() === openFullDate.getMonth()}
              $isSelect={isSelect}
              $isHoliday={isHoliday}
              $isWeekend={isWeekend}
              $rangeStatus={rangeStatus}
              $holidayColor={holidayColor}
            >
              {date.getDate()}
            </CalendarButton>
          ))}
        </div>
      ))}
    </div>
  );
};
