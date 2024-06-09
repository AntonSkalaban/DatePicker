import { FC, useContext } from "react";

import { ConfigContext } from "context";
import { StyledContainer, ViewItemBtn, ViewItemsContainer } from "styled";
import { months } from "constants/index";

import { MonthViewProps } from "./types";

export const MonthView: FC<MonthViewProps> = ({ changeView }) => {
  const { openDate } = useContext(ConfigContext);

  const handleClick = (month: string) => () => {
    changeView("day", new Date(openDate.getFullYear(), months.indexOf(month)));
  };

  return (
    <StyledContainer $withBtn={false}>
      <ViewItemsContainer>
        {months.map((month) => (
          <ViewItemBtn key={month} onClick={handleClick(month)}>
            {month}
          </ViewItemBtn>
        ))}
      </ViewItemsContainer>
    </StyledContainer>
  );
};
