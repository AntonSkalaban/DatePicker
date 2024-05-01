import React, { useContext, useLayoutEffect, useState } from "react";
import { ConfigContext } from "components/index";
import { getWeekdays } from "utils";
import { WeekdayCell } from "./styled";

export const Weekdays: React.FC = () => {
  const { isWeekStartFromSun } = useContext(ConfigContext);
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
