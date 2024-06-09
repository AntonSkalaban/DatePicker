import { FC, useContext } from "react";

import { ConfigContext } from "context";
import { getDDMMYYFromDate, getMonthName, getNextMonth, getPrevMonth } from "utils";
import { ViewType } from "types/CalendarConfig";
import NextIcon from "assets/img/svg/next.svg";
import PrevIcon from "assets/img/svg/prev.svg";

import { TitleProps } from "./types";
import { TitleButton, TitleContainer } from "./styled";

export const Title: FC<TitleProps> = ({ cuurentDate, changeOpenMonth, changeView }) => {
  const { maxDate, minDate } = useContext(ConfigContext);

  const [, mm, yy] = getDDMMYYFromDate(cuurentDate).map(Number);
  const [prevYear, prevMonth] = getPrevMonth(yy, mm);
  const [nextYear, nextMonth] = getNextMonth(yy, mm);

  const prevDate = new Date(prevYear, prevMonth - 1);
  const nextDate = new Date(nextYear, nextMonth - 1);

  const handlePrevBtnClick = () => {
    changeOpenMonth(prevDate);
  };

  const handleNextBtnClick = () => {
    changeOpenMonth(nextDate);
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
        <button onClick={handleViewBtnClick("month")}>{getMonthName(cuurentDate)}</button>{" "}
        <button onClick={handleViewBtnClick("year")}>{cuurentDate.getFullYear()}</button>
      </p>
      <TitleButton onClick={handleNextBtnClick} disabled={maxDate < nextDate}>
        <NextIcon />{" "}
      </TitleButton>
    </TitleContainer>
  );
};
