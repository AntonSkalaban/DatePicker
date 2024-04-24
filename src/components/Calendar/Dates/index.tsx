import React from "react";
import { CalendarGrid } from "types/CalendarGrid";
import { CalendarButton } from "./styled";

interface DatesProps {
  openFullDate: Date;
  dates: CalendarGrid[][];
}

export const Dates: React.FC<DatesProps> = ({ openFullDate, dates }) => {
  return (
    <div>
      {dates.map((week, index) => (
        <div key={index}>
          {week.map(({ date, isActive, rangeStatus }) => (
            <CalendarButton
              $isActive={date.getMonth() === openFullDate.getMonth()}
              key={date.toDateString()}
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
