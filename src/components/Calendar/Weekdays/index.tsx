import React, { useContext, useLayoutEffect, useState } from "react";

import { CalendarRow } from "styled";
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
    <CalendarRow>
      {weekdays.map((day) => (
        <WeekdayCell key={day}>{day}</WeekdayCell>
      ))}
    </CalendarRow>
  );
};
