import React, { useEffect, useState } from "react";
import { withClearBtn } from "hocs/withClearBtn";
import { withDateRangeControll } from "hocs/withDateRangeControll";
import { withTransitionByDate } from "hocs/withTransitionByDate";
import { Calendar } from "components";
import { DateGrid } from "utils/helpers/DateGrid";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { BaseCalendar, CalendarService } from "utils/services/calendarServeice";
import { CalendarConfig, CalendarGrid } from "./types";
import { FontStyles, GeneralStyles, NormalStyles } from "./styled";

interface DatePickerProps {
  fromDate?: string;
  toDate?: string;
  isWeekStartFromSun?: boolean;
  withJumpByEnteredDate?: boolean;
  withDateRange?: boolean;
  withTodo?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  fromDate = "2020/09/05",
  toDate = "2025/09/05",
  isWeekStartFromSun = true,
  withJumpByEnteredDate = true,
  withDateRange = true,
  withTodo = true,
}) => {
  const [openDate, setOpenDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [selectDate, setSelectDate] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);

  const config: CalendarConfig = {
    openDate: openDate,
    fromDate: dateStrToFullDate(fromDate),
    toDate: dateStrToFullDate(toDate),
    isWeekStartFromSun,
    withJumpByEnteredDate,
    withDateRange,
    withTodo,
  };

  const calendarService = new CalendarService(config);

  useEffect(() => {
    const calendarGrid = calendarService.createCalendar(openDate);
    setCalendarGrid(calendarGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const combineCalendarsGrids = (grid: CalendarGrid[][]) => {
    if (withJumpByEnteredDate && selectDate) {
      grid = DateGrid.getWithSelectDate(grid, dateStrToFullDate(selectDate));
    }

    if (withDateRange && dateRange.startDate && dateRange.endDate) {
      grid = DateGrid.getWithRange(
        grid,
        dateStrToFullDate(dateRange.startDate),
        dateStrToFullDate(dateRange.endDate),
      );
    }

    setCalendarGrid(grid);
  };

  const changeOpenFullDate = (date: Date) => {
    setOpenDate(date);
    const grid = (calendarService.calendar as BaseCalendar).createCalendarGrid(
      date,
      isWeekStartFromSun,
    );

    combineCalendarsGrids(grid);
  };

  let CalendarComponent = Calendar;

  if (withJumpByEnteredDate) {
    const handleChange = (date: string, calendarGrid: CalendarGrid[][]) => {
      setOpenDate(dateStrToFullDate(date));
      setSelectDate(date);
      combineCalendarsGrids(calendarGrid);
    };

    CalendarComponent = withTransitionByDate(
      calendarService,
      handleChange,
      selectDate,
    )(CalendarComponent);
  }

  if (withDateRange) {
    const hanldeChange = (
      startDateStr: string,
      endDateStr: string,
      calendarGrid: CalendarGrid[][],
    ) => {
      setOpenDate(dateStrToFullDate(startDateStr));
      setDateRange({ startDate: startDateStr, endDate: endDateStr });
      combineCalendarsGrids(calendarGrid);
    };

    CalendarComponent = withDateRangeControll(
      calendarService,
      hanldeChange,
      dateRange,
    )(CalendarComponent);
  }

  if (dateRange.startDate || dateRange.endDate || selectDate) {
    const hanldeClick = () => {
      setDateRange({ startDate: "", endDate: "" });
      setSelectDate("");
      const newDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      changeOpenFullDate(newDate);
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
        changeOpenFullDate={changeOpenFullDate}
      />
    </>
  );
};
