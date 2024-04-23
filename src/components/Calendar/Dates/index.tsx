import React from "react";
import { CalendarButton } from "./styled";

interface DatesProps {
  openFullDate: Date;
  dates: { date: Date; isActive: boolean }[][];
}

export const Dates: React.FC<DatesProps> = ({ openFullDate, dates }) => {
  return (
    <div>
      {dates.map((week, index) => (
        <div key={index}>
          {week.map(({ date, isActive }) => (
            <CalendarButton
              $isActive={date.getMonth() === openFullDate.getMonth()}
              key={date.toDateString()}
              style={{ background: `${isActive ? "pink" : " "}` }}
            >
              {date.getDate()}
            </CalendarButton>
          ))}
        </div>
      ))}
    </div>
  );
};
