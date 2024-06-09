import { FC } from "react";

import { StyledContainer } from "styled";

import { DatesGrid } from "./DatesGrid";
import { Title } from "./Title";
import { DayCalendarProps } from "./types";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export const DayCalendar: FC<DayCalendarProps> = ({
  calendarGrid,
  changeOpenFullDate,
  withClearBtn,
  addTodo,
  changeView,
  cuurentDate,
}) => {
  return (
    <CalendarWrapper id="calendar-wrapper">
      <StyledContainer $withBtn={withClearBtn}>
        <Title
          cuurentDate={cuurentDate}
          changeOpenMonth={changeOpenFullDate}
          changeView={changeView}
        />
        <Weekdays />
        <DatesGrid cuurentDate={cuurentDate} addTodo={addTodo} dates={calendarGrid} />
      </StyledContainer>
    </CalendarWrapper>
  );
};
