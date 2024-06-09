import { FC, useContext } from "react";

import { ConfigContext } from "context";
import { StyledContainer, ViewItemBtn, ViewItemsContainer } from "styled";
import { getNumbersInRange } from "utils";

import { YearViewProps } from "./types";

export const YearView: FC<YearViewProps> = ({ changeView }) => {
  const { minDate, maxDate } = useContext(ConfigContext);

  const handleClick = (year: number) => () => {
    changeView("day", new Date(year));
  };

  return (
    <StyledContainer $withBtn={false}>
      <ViewItemsContainer>
        {getNumbersInRange(minDate.getFullYear(), maxDate.getFullYear()).map((year) => (
          <ViewItemBtn key={year} onClick={handleClick(year)}>
            {year}
          </ViewItemBtn>
        ))}
      </ViewItemsContainer>
    </StyledContainer>
  );
};
