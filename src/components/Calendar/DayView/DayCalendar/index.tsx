import { FC } from "react";

import { StyledContainer } from "styled";

import { DatesGrid } from "./DatesGrid";
import { Title } from "./Title";
import { DayCalendarProps } from "./types";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export const DayCalendar: FC<DayCalendarProps> = ({
  calendarGrid,
  withClearBtn,
  addTodo,
  changeView,
}) => {
  return (
    <CalendarWrapper id="calendar-wrapper">
      <StyledContainer $withBtn={withClearBtn}>
        <Title changeView={changeView} />
        <Weekdays />
        <DatesGrid addTodo={addTodo} dates={calendarGrid} />
      </StyledContainer>
    </CalendarWrapper>
  );
};
