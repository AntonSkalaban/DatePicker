import { FC, useContext, useState } from "react";

import { ConfigContext } from "context";
import { CalendarRow } from "styled";
import { TodoList } from "components";

import { DatesProps } from "./types";
import { CalendarCell } from "./styled";

export const Dates: FC<DatesProps> = ({ dates }) => {
  const { cuurentDate, withTodo, holidayColor } = useContext(ConfigContext);
  const [isOpen, setIsOpen] = useState(false);
  const [openDate, setOpenDate] = useState("");

  const hanleClick = (date: Date) => () => {
    if (!withTodo) return;
    setIsOpen(true);
    setOpenDate(date.toDateString());
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <TodoList isOpen={isOpen} onClose={hanldeClose} date={openDate} />
      {dates.map((week, index) => (
        <CalendarRow key={index}>
          {week.map(({ date, isSelect, rangeStatus, isHoliday, isWeekend }) => (
            <CalendarCell
              onClick={hanleClick(date)}
              key={date.toDateString()}
              $isActive={date.getMonth() === cuurentDate.getMonth()}
              $isSelect={isSelect}
              $isHoliday={isHoliday}
              $isWeekend={isWeekend}
              $rangeStatus={rangeStatus}
              $holidayColor={holidayColor}
            >
              {date.getDate()}
            </CalendarCell>
          ))}
        </CalendarRow>
      ))}
    </div>
  );
};
