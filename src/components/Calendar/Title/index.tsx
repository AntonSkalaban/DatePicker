import React from "react";
import { getDDMMYYFromDate, getMonthName, getNextMonth, getPrevMonth } from "utils";
import NextIcon from "assets/img/svg/next.svg";
import PrevIcon from "assets/img/svg/prev.svg";
import { TitleContainer } from "./styled";

interface TitleProps {
  openDate: Date;
  changeOpenMonth: (date: Date) => void;
}
export const Title: React.FC<TitleProps> = ({ openDate, changeOpenMonth }) => {
  const [, mm, yy] = getDDMMYYFromDate(openDate).map(Number);

  const toPrevMonth = () => {
    const [prevYear, prevMonth] = getPrevMonth(yy, mm);
    changeOpenMonth(new Date(prevYear, prevMonth - 1));
  };

  const toNextMonth = () => {
    const [nextYear, nextMonth] = getNextMonth(yy, mm);
    changeOpenMonth(new Date(nextYear, nextMonth - 1));
  };

  return (
    <TitleContainer>
      <button onClick={toPrevMonth}>
        <PrevIcon />{" "}
      </button>
      <p>
        {getMonthName(openDate)} {openDate.getFullYear()}
      </p>
      <button onClick={toNextMonth}>
        <NextIcon />{" "}
      </button>
    </TitleContainer>
  );
};
