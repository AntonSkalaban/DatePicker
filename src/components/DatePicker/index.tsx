import { FC, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { ConfigContext } from "context";
import { withClearButton, withDateRangeControll, withTransitionByDate } from "hocs";
import { GeneralStyles, NormalStyles } from "styled";
import { Calendar, ErrorBoundary } from "components";
import { baseTheme } from "constants/index";
import { CalendarServise, dateStrToFullDate, getArrayFromLS } from "utils";
import { CalendarConfig, CalendarGrid } from "types";

import { DatePickerProps } from "./types";

export const DatePicker: FC<DatePickerProps> = ({
  minDate = "01/01/2020",
  maxDate = "01/01/2025",
  isWeekStartFromSun = false,
  withDateSelect = true,
  withDateRange = true,
  withTodo = true,
  showWeekendsAndHoliday = true,
  holidayColor = "red",
}) => {
  const [calendarSettings, setCalendarSettings] = useState({
    cuurentDate: new Date(),
    selectDate: "",
    dateRange: { startDate: "", endDate: "" },
    todos: getArrayFromLS<{ date: string; todo: string[] }>("todos") || [],
  });

  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);

  const config: CalendarConfig = useMemo(() => {
    return {
      minDate: dateStrToFullDate(minDate),
      maxDate: dateStrToFullDate(maxDate),
      isWeekStartFromSun,
      withDateSelect,
      withDateRange,
      withTodo,
      showWeekendsAndHoliday,
      holidayColor,
      ...calendarSettings,
    };
  }, [
    calendarSettings,
    isWeekStartFromSun,
    maxDate,
    minDate,
    showWeekendsAndHoliday,
    withDateRange,
    withDateSelect,
    withTodo,
    holidayColor,
  ]);

  let CalendarComponent = Calendar;

  useEffect(() => {
    const calendar = new CalendarServise();
    const grid = calendar.getCalendarGrid(config);
    setCalendarGrid(grid);
  }, [config]);

  const hanldePaginationBtnClick = (date: Date) => {
    setCalendarSettings((prev) => ({ ...prev, cuurentDate: date }));
  };

  const handleAddTodo = (newTodos: { date: string; todo: string[] }) => {
    setCalendarSettings((prev) => ({
      ...prev,
      todos: [...prev.todos.filter(({ date }) => date !== newTodos.date), newTodos],
    }));
  };

  if (withDateSelect) {
    const handleChange = (dateStr: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        selectDate: dateStr,
        cuurentDate: dateStrToFullDate(dateStr),
      }));
    };

    CalendarComponent = withTransitionByDate(handleChange)(CalendarComponent);
  }

  if (withDateRange) {
    const hanldeChange = (startDateStr: string, endDateStr: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        dateRange: { startDate: startDateStr, endDate: endDateStr },
        cuurentDate: dateStrToFullDate(startDateStr),
      }));
    };

    CalendarComponent = withDateRangeControll(hanldeChange)(CalendarComponent);
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
    <ThemeProvider theme={baseTheme}>
      <GeneralStyles />
      <NormalStyles />

      <ConfigContext.Provider value={config}>
        <ErrorBoundary>
          <CalendarComponent
            withClearBtn={!!withClearBtn}
            calendarGrid={calendarGrid}
            addTodo={handleAddTodo}
            changeOpenFullDate={hanldePaginationBtnClick}
          />
        </ErrorBoundary>
      </ConfigContext.Provider>
    </ThemeProvider>
  );
};
