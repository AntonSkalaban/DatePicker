import React, { useState } from "react";
import { TextInput } from "components/TextInput";
import { CalendarGrid } from "types/CalendarGrid";
import { CalendarButton } from "./styled";

interface DatesProps {
  openFullDate: Date;
  dates: CalendarGrid[][];
  widthTodo: boolean;
}

export const Dates: React.FC<DatesProps> = ({ openFullDate, dates, widthTodo }) => {
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
          {week.map(({ date, isActive, rangeStatus }) => (
            <CalendarButton
              onClick={hanleClick(date)}
              key={date.toDateString()}
              $isActive={date.getMonth() === openFullDate.getMonth()}
              $isSelect={isActive}
              $rangeStatus={rangeStatus}
            >
              {date.getDate()}
            </CalendarButton>
          ))}
        </div>
      ))}
    </div>
  );
};
