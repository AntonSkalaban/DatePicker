import { FC } from "react";

import { StyledContainer } from "styled";

import { DatesGrid } from "./DatesGrid";
import { Title } from "./Title";
import { CalendarProps } from "./types";
import { Weekdays } from "./Weekdays";
import { CalendarWrapper } from "./styled";

export const Calendar: FC<CalendarProps> = ({
  calendarGrid,
  changeOpenFullDate,
  withClearBtn,
  addTodo,
}) => {
  return (
    <CalendarWrapper id="calendar-wrapper">
      <StyledContainer $withBtn={withClearBtn}>
        <Title changeOpenMonth={changeOpenFullDate} />
        <Weekdays />
        <DatesGrid addTodo={addTodo} dates={calendarGrid} />
      </StyledContainer>
    </CalendarWrapper>
  );
};
