import { styled } from "styled-components";

type RangeStatus = "" | "endRange" | "startRange" | "inRange";

const colors = {
  startRange: "pink",
  endRange: "pink",
  inRange: "blue",
};

export const CalendarButton = styled.button<{
  $isSelect?: boolean;
  $isActive?: boolean;
  $rangeStatus: RangeStatus;
}>`
  width: 32px;
  height: 32px;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;

  background: ${({ $isSelect, $rangeStatus }) =>
    $rangeStatus ? colors[$rangeStatus] : $isSelect ? "pink" : "#ffffff "};
  color: ${({ $isActive }) => ($isActive ? "#333333;" : " #aaaaaa;")};
`;
