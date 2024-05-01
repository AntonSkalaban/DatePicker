import React, { useLayoutEffect, useState } from "react";
import { getWeekdays } from "utils";
import { WeekdayCell } from "./styled";

interface WeekdaysProps {
  isWeekStartFromSun: boolean;
}

export const Weekdays: React.FC<WeekdaysProps> = ({ isWeekStartFromSun }) => {
  const [weekdays, setWeekdays] = useState([] as string[]);

  useLayoutEffect(() => {
    setWeekdays(getWeekdays(isWeekStartFromSun));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {weekdays.map((day) => (
        <WeekdayCell key={day}>{day}</WeekdayCell>
      ))}
    </div>
  );
};
