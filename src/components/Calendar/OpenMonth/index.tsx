import React from "react";
import { getMonthName } from "utils/helpers/getMonthName";
import { getDDMMYY, getNextMonth, getPrevMonth } from "utils/helpers/helpers";
import NextIcon from "assets/img/svg/next.svg";
import PrevIcon from "assets/img/svg/prev.svg";

interface OpenMonthProps {
  openFullDate: Date;
  changeOpenMonth: (date: Date) => void;
}
export const OpenMonth: React.FC<OpenMonthProps> = ({ openFullDate, changeOpenMonth }) => {
  const [, mm, yy] = getDDMMYY(openFullDate);

  const toPrevMonth = () => {
    const [prevYear, prevMonth] = getPrevMonth(yy, mm);
    changeOpenMonth(new Date(prevYear, prevMonth - 1));
  };

  const toNextMonth = () => {
    const [nextYear, nextMonth] = getNextMonth(yy, mm);
    changeOpenMonth(new Date(nextYear, nextMonth - 1));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <button onClick={toPrevMonth}>
        <PrevIcon />{" "}
      </button>
      <p>
        {getMonthName(openFullDate)} {openFullDate.getFullYear()}
      </p>
      <button onClick={toNextMonth}>
        <NextIcon />{" "}
      </button>
    </div>
  );
};
