import { FC, useContext, useLayoutEffect, useState } from "react";

import { ConfigContext } from "context";
import { CalendarRow } from "styled";
import { getWeekdays } from "utils";

import { WeekdayCell } from "./styled";

export const Weekdays: FC = () => {
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
