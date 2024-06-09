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
    cuurentDate: new Date(),
    selectDate: "",
    dateRange: { startDate: "", endDate: "" },
    todos: getArrayFromLS<{ date: string; todo: string[] }>("todos") || [],
  });

  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);

  const hanldePaginationBtnClick = (date: Date) => {
    setCalendarSettings((prev) => ({ ...prev, cuurentDate: date }));
  };

  const handleAddTodo = (newTodos: { date: string; todo: string[] }) => {
    setCalendarSettings((prev) => ({
      ...prev,
      todos: [...prev.todos.filter(({ date }) => date !== newTodos.date), newTodos],
    }));
  };

  useEffect(() => {
    const calendar = new CalendarServise();
    const grid = calendar.getCalendarGrid({ ...defaultConfig, ...calendarSettings });
    setCalendarGrid(grid);
  }, [calendarSettings, defaultConfig]);

  let CalendarComponent = DayCalendar;

  if (defaultConfig.withDateSelect) {
    const handleChange = (dateStr: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        selectDate: dateStr,
        cuurentDate: dateStrToFullDate(dateStr),
      }));
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
        cuurentDate: dateStrToFullDate(startDateStr),
      }));
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
        cuurentDate: new Date(),
      }));
    };

    CalendarComponent = withClearButton(hanldeClick)(CalendarComponent);
  }

  return (
    <CalendarComponent
      cuurentDate={calendarSettings.cuurentDate}
      withClearBtn={!!withClearBtn}
      calendarGrid={calendarGrid}
      addTodo={handleAddTodo}
      changeOpenFullDate={hanldePaginationBtnClick}
      changeView={changeView}
    />
  );
};
