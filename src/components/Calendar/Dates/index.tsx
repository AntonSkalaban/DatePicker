import React, { useState } from "react";
import { TextInput } from "components";
import { CalendarGrid } from "types";
import { CalendarButton } from "./styled";

interface DatesProps {
  openDate: Date;
  dates: CalendarGrid[][];
  widthTodo: boolean;
  holidayColor: "red" | "green" | "blue";
}

export const Dates: React.FC<DatesProps> = ({ openDate, dates, widthTodo, holidayColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState("");

  const hanleClick = (date: Date) => () => {
    if (!widthTodo) return;
    setIsOpen(true);
    setClickedDate(date.toDateString());
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextInput isOpen={isOpen} onClose={hanldeClose} date={clickedDate} />
      {dates.map((week, index) => (
        <div key={index} style={{ display: "flex" }}>
          {week.map(({ date, isSelect, rangeStatus, isHoliday, isWeekend }) => (
            <CalendarButton
              onClick={hanleClick(date)}
              key={date.toDateString()}
              $isActive={date.getMonth() === openDate.getMonth()}
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
