import React from "react";
import { CalendarButton } from "./styled";

interface DatesProps {
  openFullDate: Date;
  dates: Date[][];
}

export const Dates: React.FC<DatesProps> = ({ openFullDate, dates }) => {
  return (
    <div>
      {dates.map((week, index) => (
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
  );
};
