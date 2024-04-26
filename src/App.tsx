import React, { useEffect, useMemo, useState } from "react";
import { withClearBtn } from "hocs/withClearBtn";
import { withDateRangeControll } from "hocs/withDateRangeControll";
import { withTransitionByDate } from "hocs/withTransitionByDate";
import { Calendar } from "components";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarServise } from "utils/services/calendarServeice";
import { CalendarConfig, CalendarGrid } from "./types";
import { FontStyles, GeneralStyles, NormalStyles } from "./styled";

interface DatePickerProps {
  fromDate?: string;
  toDate?: string;
  isWeekStartFromSun?: boolean;
  withJumpByEnteredDate?: boolean;
  withDateRange?: boolean;
  withTodo?: boolean;
  showWeekendsAndHoliday?: boolean;
  holidayColor?: "red" | "blue" | "green";
}

export const DatePicker: React.FC<DatePickerProps> = ({
  fromDate = "2020/09/05",
  toDate = "2025/09/05",
  isWeekStartFromSun = true,
  withJumpByEnteredDate = true,
  withDateRange = true,
  withTodo = true,
  showWeekendsAndHoliday = true,
  holidayColor = "red",
}) => {
  const [openDate, setOpenDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);

  const config: CalendarConfig = useMemo(() => {
    return {
      openDate,
      selectDate,
      fromDate: dateStrToFullDate(fromDate),
      toDate: dateStrToFullDate(toDate),
      isWeekStartFromSun,
      withJumpByEnteredDate,
      withDateRange,
      dateRange,
      withTodo,
      showWeekendsAndHoliday,
    };
  }, [
    openDate,
    selectDate,
    dateRange,
    fromDate,
    isWeekStartFromSun,
    showWeekendsAndHoliday,
    toDate,
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
    setOpenDate(date);
  };

  if (withJumpByEnteredDate) {
    const handleChange = (date: string) => {
      setOpenDate(dateStrToFullDate(date));
      setSelectDate(date);
    };

    CalendarComponent = withTransitionByDate(handleChange, selectDate)(CalendarComponent);
  }

  if (withDateRange) {
    const hanldeChange = (startDateStr: string, endDateStr: string) => {
      setOpenDate(dateStrToFullDate(startDateStr));
      setDateRange({ startDate: startDateStr, endDate: endDateStr });
    };
    CalendarComponent = withDateRangeControll(hanldeChange, dateRange)(CalendarComponent);
  }

  if (dateRange.startDate || dateRange.endDate || selectDate) {
    const hanldeClick = () => {
      setDateRange({ startDate: "", endDate: "" });
      setSelectDate("");
      setOpenDate(new Date());
    };
    CalendarComponent = withClearBtn(hanldeClick)(CalendarComponent);
  }

  return (
    <>
      <GeneralStyles />
      <NormalStyles />
      <FontStyles />

      <CalendarComponent
        withClearBtn={!!dateRange.startDate || !!dateRange.endDate || !!selectDate}
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
