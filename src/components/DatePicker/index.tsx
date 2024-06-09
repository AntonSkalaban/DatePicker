import { FC, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { ConfigContext } from "context";
import { GeneralStyles, NormalStyles } from "styled";
import { calenadar, ErrorBoundary } from "components";
import { baseTheme } from "constants/index";
import { dateStrToFullDate } from "utils";
import { CalendarConfig, ViewType } from "types";

import { DatePickerProps } from "./types";

export const DatePicker: FC<DatePickerProps> = ({
  minDate = "01/01/2020",
  maxDate = "01/01/2100",
  isWeekStartFromSun = false,
  withDateSelect = true,
  withDateRange = true,
  withTodo = true,
  showWeekendsAndHoliday = true,
  holidayColor = "red",
}) => {
  const [calendarView, setCalendarView] = useState<ViewType>("day");
  const [openDate, setOpenDate] = useState(new Date());

  const defaultConfig: CalendarConfig = useMemo(() => {
    return {
      openDate,
      minDate: dateStrToFullDate(minDate),
      maxDate: dateStrToFullDate(maxDate),
      isWeekStartFromSun,
      withDateSelect,
      withDateRange,
      withTodo,
      showWeekendsAndHoliday,
      holidayColor,
    };
  }, [
    holidayColor,
    isWeekStartFromSun,
    maxDate,
    minDate,
    openDate,
    showWeekendsAndHoliday,
    withDateRange,
    withDateSelect,
    withTodo,
  ]);

  const handleViewChange = (viewType: ViewType, openDate?: Date) => {
    setCalendarView(viewType);
    if (openDate) setOpenDate(openDate);
  };

  return (
    <ThemeProvider theme={baseTheme}>
      <GeneralStyles />
      <NormalStyles />

      <ConfigContext.Provider value={defaultConfig}>
        <ErrorBoundary>{calenadar[calendarView](handleViewChange)}</ErrorBoundary>
      </ConfigContext.Provider>
    </ThemeProvider>
  );
};
