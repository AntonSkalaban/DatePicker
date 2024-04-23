import React, { useEffect, useState } from "react";
import { withTransitionByDate } from "hocs/withTransitionByDate";
import { Calendar } from "components";
import { dateStrToFullDate } from "utils/helpers/helpers";
import { CalendarService, TransitionByDateDecorator } from "utils/services/calendarServeice";
import { CalendarConfig, CalendarGrid } from "./types";
import { GeneralStyles, NormalStyles } from "./styled";

interface DatePickerProps {
  fromDate?: string;
  toDate?: string;
  isWeekStartFromSun?: boolean;
  withJumpByEnteredDate?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  fromDate = "2020/09/05",
  toDate = "2025/09/05",
  isWeekStartFromSun = true,
  withJumpByEnteredDate = true,
}) => {
  const [openDate, setOpenDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [calendarGrid, setCalendarGrid] = useState([] as CalendarGrid[][]);

  const config: CalendarConfig = {
    openDate: openDate,
    fromDate: dateStrToFullDate(fromDate),
    toDate: dateStrToFullDate(toDate),
    isWeekStartFromSun,
    withJumpByEnteredDate,
  };

  const calendarService = new CalendarService(config);
  useEffect(() => {
    const calendarGrid = calendarService.createCalendar();
    setCalendarGrid(calendarGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let CalendarComponent = Calendar;

  if (withJumpByEnteredDate) {
    const hanldeChange = (dateStr: string) => {
      setOpenDate(dateStrToFullDate(dateStr));

      setCalendarGrid(
        (calendarService.calendar as TransitionByDateDecorator).jumpByEnteredDateDecorator(
          dateStr,
          isWeekStartFromSun,
        ),
      );
    };

    CalendarComponent = withTransitionByDate(hanldeChange)(CalendarComponent);
  }

  if (withDateRange) {
    CalendarComponent == withDateRange(CalendarWithTransitionByDate);
  }

  return (
    <>
      <GeneralStyles />
      <NormalStyles />

      <CalendarComponent calendarGrid={calendarGrid} openDate={config.openDate} />
    </>
  );
};

// const withDateRange = (Compnent: React.FC<CalendarProps>) => {
//   // eslint-disable-next-line react/display-name
//   return (props: CalendarProps) => {
//     return (
//       <>
//         <DateInput title="From date" />
//         <DateInput title="To date" />
//         <Compnent {...props} />
//       </>
//     );
//   };
// };
