import React, { useEffect, useMemo, useState } from "react";
import { withClearButton } from "hocs/withClearButton";
import { withDateRangeControll } from "hocs/withDateRangeControll";
import { withTransitionByDate } from "hocs/withTransitionByDate";
import { Calendar } from "components";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarServise } from "utils/services/CalendarServise";
import { CalendarConfig, CalendarGrid } from "./types";
import { FontStyles, GeneralStyles, NormalStyles } from "./styled";

interface DatePickerProps {
  minDate?: string;
  maxDate?: string;
  isWeekStartFromSun?: boolean;
  withJumpByEnteredDate?: boolean;
  withDateRange?: boolean;
  withTodo?: boolean;
  showWeekendsAndHoliday?: boolean;
  holidayColor?: "red" | "blue" | "green";
}

export const DatePicker: React.FC<DatePickerProps> = ({
  minDate = "05/09/2020",
  maxDate = "07/07/2030",
  isWeekStartFromSun = true,
  withJumpByEnteredDate = true,
  withDateRange = true,
  withTodo = true,
  showWeekendsAndHoliday = true,
  holidayColor = "red",
}) => {
  const [calendarSettings, setCalendarSettings] = useState({
    openDate: new Date(),
    selectDate: "",
    dateRange: { startDate: "", endDate: "" },
  });
  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);
  const config: CalendarConfig = useMemo(() => {
    return {
      minDate: dateStrToFullDate(minDate),
      maxDate: dateStrToFullDate(maxDate),
      isWeekStartFromSun,
      withJumpByEnteredDate,
      withDateRange,
      withTodo,
      showWeekendsAndHoliday,
      ...calendarSettings,
    };
  }, [
    calendarSettings,
    isWeekStartFromSun,
    maxDate,
    minDate,
    showWeekendsAndHoliday,
    withDateRange,
    withJumpByEnteredDate,
    withTodo,
  ]);

  let CalendarComponent = Calendar;

  useEffect(() => {
    const calendar = new CalendarServise();
    const grid = calendar.getCalendarGrid(config);
    setCalendarGrid(grid);
  }, [config]);

  const hanldeClick = (date: Date) => {
    setCalendarSettings((prev) => ({ ...prev, openDate: date }));
  };

  if (withJumpByEnteredDate) {
    const handleChange = (date: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        selectDate: date,
        openDate: dateStrToFullDate(date),
      }));
    };

    CalendarComponent = withTransitionByDate(
      handleChange,
      calendarSettings.selectDate,
      config.minDate,
      config.maxDate,
    )(CalendarComponent);
  }

  if (withDateRange) {
    const hanldeChange = (startDateStr: string, endDateStr: string) => {
      setCalendarSettings((prev) => ({
        ...prev,
        dateRange: { startDate: startDateStr, endDate: endDateStr },
        openDate: dateStrToFullDate(startDateStr),
      }));
    };

    CalendarComponent = withDateRangeControll(
      hanldeChange,
      calendarSettings.dateRange,
      config.minDate,
      config.maxDate,
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
        openDate: new Date(),
      }));
    };

    CalendarComponent = withClearButton(hanldeClick)(CalendarComponent);
  }

  return (
    <>
      <GeneralStyles />
      <NormalStyles />
      <FontStyles />

      <CalendarComponent
        data-testId={"datePicker"}
        withClearBtn={!!withClearBtn}
        isWeekStartFromSun={isWeekStartFromSun}
        widthTodo={withTodo}
        calendarGrid={calendarGrid}
        openDate={config.openDate}
        holidayColor={holidayColor}
        changeOpenFullDate={hanldeClick}
      />
    </>
  );
};
