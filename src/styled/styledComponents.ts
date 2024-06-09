import { styled } from "styled-components";

import { defaultBorder } from "./mixins";

export const StyledContainer = styled.div<{ $withBtn: boolean }>`
  width: 250px;
  min-height: 225px;
  height: 100%;
  padding: 5px;

  background: ${({ theme }) => theme.colors.white};
  ${defaultBorder};
  border-radius: ${({ $withBtn }) => ($withBtn ? " 8px 8px 0 0" : "8px")};
`;

export const StyledContainerButton = styled.button`
  width: 250px;
  padding: 10px 0px 10px 0px;

  background: ${({ theme }) => theme.colors.white};
  ${defaultBorder};
  border-radius: 0 0 8px 8px;

  font-weight: "400";
`;

export const CalendarRow = styled.div`
  display: flex;
`;

export const ViewItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 62.5px;
  height: 225px;
  overflow: auto;
`;

export const ViewItemBtn = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 10px;
  }
`;
