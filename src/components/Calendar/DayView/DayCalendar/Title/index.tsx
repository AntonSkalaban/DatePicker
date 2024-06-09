import { FC, useContext } from "react";

import { ConfigContext } from "context";
import { getDDMMYYFromDate, getMonthName, getNextMonth, getPrevMonth } from "utils";
import { ViewType } from "types/CalendarConfig";
import NextIcon from "assets/img/svg/next.svg";
import PrevIcon from "assets/img/svg/prev.svg";

import { TitleProps } from "./types";
import { TitleButton, TitleContainer } from "./styled";

export const Title: FC<TitleProps> = ({ changeView }) => {
  const { maxDate, minDate, openDate } = useContext(ConfigContext);

  const [, mm, yy] = getDDMMYYFromDate(openDate).map(Number);
  const [prevYear, prevMonth] = getPrevMonth(yy, mm);
  const [nextYear, nextMonth] = getNextMonth(yy, mm);

  const prevDate = new Date(prevYear, prevMonth - 1);
  const nextDate = new Date(nextYear, nextMonth - 1);

  const handlePrevBtnClick = () => {
    changeView("day", prevDate);
  };

  const handleNextBtnClick = () => {
    changeView("day", nextDate);
  };

  const handleViewBtnClick = (view: ViewType) => () => {
    changeView(view);
  };

  return (
    <TitleContainer>
      <TitleButton onClick={handlePrevBtnClick} disabled={minDate > prevDate}>
        <PrevIcon />{" "}
      </TitleButton>
      <p>
        <button onClick={handleViewBtnClick("month")}>{getMonthName(openDate)}</button>{" "}
        <button onClick={handleViewBtnClick("year")}>{openDate.getFullYear()}</button>
      </p>
      <TitleButton onClick={handleNextBtnClick} disabled={maxDate < nextDate}>
        <NextIcon />{" "}
      </TitleButton>
    </TitleContainer>
  );
};
