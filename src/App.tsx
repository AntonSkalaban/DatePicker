import React, { useEffect, useState } from "react";
import { withClearBtn } from "hocs/withClearBtn";
import { withDateRangeControll } from "hocs/withDateRangeControll";
import { withTransitionByDate } from "hocs/withTransitionByDate";
import { Calendar } from "components";
import { DateGrid } from "utils/helpers/DateGrid";
import { dateStrToFullDate } from "utils/helpers/helpers";
import {
  BaseCalendar,
  CalendarService,
  DateRangeDecorator,
  TransitionByDateDecorator,
} from "utils/services/calendarServeice";
import { CalendarConfig, CalendarGrid } from "./types";
import { GeneralStyles, NormalStyles } from "./styled";

interface DatePickerProps {
  fromDate?: string;
  toDate?: string;
  isWeekStartFromSun?: boolean;
  withJumpByEnteredDate?: boolean;
  withDateRange?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  fromDate = "2020/09/05",
  toDate = "2025/09/05",
  isWeekStartFromSun = true,
  withJumpByEnteredDate = true,
  withDateRange = true,
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
  };

  const calendarService = new CalendarService(config);

  useEffect(() => {
    const calendarGrid = calendarService.createCalendar(openDate);
    setCalendarGrid(calendarGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeOpenFullDate = (date: Date) => {
    setOpenDate(date);
    let grid = (calendarService.calendar as BaseCalendar).createCalendarGrid(
      date,
      isWeekStartFromSun,
    );

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

  let CalendarComponent = Calendar;

  if (withJumpByEnteredDate) {
    const hanldeChange = (dateStr: string) => {
      setCalendarGrid(
        (calendarService.calendar as TransitionByDateDecorator).jumpByEnteredDate(
          dateStrToFullDate(dateStr),
          isWeekStartFromSun,
        ),
      );
      setSelectDate(dateStr);
      setOpenDate(dateStrToFullDate(dateStr));
    };

    CalendarComponent = withTransitionByDate(hanldeChange, selectDate)(CalendarComponent);
  }

  if (withDateRange) {
    const hanldeChange = (startDateStr: string, endDateStr: string) => {
      setCalendarGrid(
        (calendarService.calendar as DateRangeDecorator).getDateRangeGrid(
          dateStrToFullDate(startDateStr),
          dateStrToFullDate(endDateStr),
          isWeekStartFromSun,
        ),
      );
      setDateRange({ startDate: startDateStr, endDate: endDateStr });
      setOpenDate(dateStrToFullDate(startDateStr));
    };

    CalendarComponent = withDateRangeControll(hanldeChange, dateRange)(CalendarComponent);
  }

  if (withJumpByEnteredDate || withDateRange) {
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

      <CalendarComponent
        calendarGrid={calendarGrid}
        openDate={config.openDate}
        changeOpenFullDate={changeOpenFullDate}
      />
    </>
  );
};
