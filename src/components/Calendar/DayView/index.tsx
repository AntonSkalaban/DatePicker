import { FC, useContext, useEffect, useState } from "react";

import { ConfigContext } from "context";
import { withClearButton, withDateRangeControll, withTransitionByDate } from "hocs";
import { CalendarServise, dateStrToFullDate, getArrayFromLS } from "utils";
import { CalendarGrid, DayCalendarSettings } from "types";

import { DayCalendar } from "./DayCalendar";
import { DayViewProps } from "./types";

export const DayView: FC<DayViewProps> = ({ changeView }) => {
  const defaultConfig = useContext(ConfigContext);

  const [calendarSettings, setCalendarSettings] = useState<DayCalendarSettings>({
    selectDate: "",
    dateRange: { startDate: "", endDate: "" },
    todos: getArrayFromLS<{ date: string; todo: string[] }>("todos") || [],
  });

  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);

  useEffect(() => {
    const calendar = new CalendarServise();
    const grid = calendar.getCalendarGrid({ ...defaultConfig, ...calendarSettings });
    setCalendarGrid(grid);
  }, [calendarSettings, defaultConfig]);

  const handleAddTodo = (newTodos: { date: string; todo: string[] }) => {
    setCalendarSettings((prev) => ({
      ...prev,
      todos: [...prev.todos.filter(({ date }) => date !== newTodos.date), newTodos],
    }));
  };

  let CalendarComponent = DayCalendar;

  if (defaultConfig.withDateSelect) {
    const handleChange = (dateStr: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        selectDate: dateStr,
      }));
      changeView("day", dateStrToFullDate(dateStr));
    };

    CalendarComponent = withTransitionByDate(
      calendarSettings.selectDate,
      handleChange,
    )(CalendarComponent);
  }

  if (defaultConfig.withDateRange) {
    const hanldeChange = (startDateStr: string, endDateStr: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        dateRange: { startDate: startDateStr, endDate: endDateStr },
      }));
      changeView("day", dateStrToFullDate(startDateStr));
    };

    CalendarComponent = withDateRangeControll(
      calendarSettings.dateRange,
      hanldeChange,
    )(CalendarComponent);
  }

  const withClearBtn =
    calendarSettings.dateRange.startDate ||
    calendarSettings.dateRange.endDate ||
    calendarSettings.selectDate;

  if (withClearBtn) {
    const hanldeClick = () => {
      setCalendarSettings((prev) => ({
        ...prev,
        dateRange: { startDate: "", endDate: "" },
      }));
      changeView("day", new Date());
    };

    CalendarComponent = withClearButton(hanldeClick)(CalendarComponent);
  }

  return (
    <CalendarComponent
      withClearBtn={!!withClearBtn}
      calendarGrid={calendarGrid}
      addTodo={handleAddTodo}
      changeView={changeView}
    />
  );
};
