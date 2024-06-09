import { FC, useContext, useState } from "react";

import { ConfigContext } from "context";
import { CalendarRow } from "styled";
import { TodoList } from "components";

import { DatesGridProps } from "./types";
import { CalendarCell } from "./styled";

export const DatesGrid: FC<DatesGridProps> = ({ dates, cuurentDate, addTodo }) => {
  const { withTodo, holidayColor } = useContext(ConfigContext);
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);
  const [todoData, setTodoData] = useState({ date: "", todo: [] as string[] });

  const hanleClick = (date: Date, todo: string[] | null) => () => {
    if (!withTodo) return;
    setIsTodoListOpen(true);
    setTodoData({ date: date.toDateString(), todo: todo ?? [] });
  };

  const hanldeClose = () => {
    setIsTodoListOpen(false);
  };

  return (
    <div>
      {isTodoListOpen && <TodoList addTodo={addTodo} onClose={hanldeClose} todoData={todoData} />}
      {dates.map((week, index) => (
        <CalendarRow key={index}>
          {week.map(({ date, isSelect, rangeStatus, isHoliday, isWeekend, todo }) => (
            <CalendarCell
              onClick={hanleClick(date, todo)}
              key={date.toDateString()}
              $withTask={!!todo}
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
