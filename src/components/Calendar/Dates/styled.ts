import { styled } from "styled-components";

type RangeStatus = "" | "endRange" | "startRange" | "inRange";

const bgColors = {
  default: "rgba(255, 255, 255, 1)",
  select: "rgba(47, 128, 237, 1)",
  startRange: "rgba(47, 128, 237, 0.6)",
  endRange: "rgba(47, 128, 237, 0.6)",
  inRange: "rgba(47, 128, 237, 0.1)",
};

const colors = {
  nonActive: "rgba(170, 170, 170, 1)",
  active: "rgba(0, 0, 0, 1)",
  select: "rgba(255, 255, 255, 1)",
  inRange: "rgba(47, 128, 237, 1)",
};

const borderdRadiuses = {
  select: "8px",
  startRange: "8px 0  0 8px",
  endRange: "0px 8px 8px 0",
  inRange: "0",
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
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;

  border-radius: ${({ $isSelect, $rangeStatus }) => {
    if ($isSelect) return borderdRadiuses.select;
    if ($rangeStatus) return borderdRadiuses[$rangeStatus];
    return "0";
  }};

  background: ${({ $isSelect, $rangeStatus }) => {
    if ($isSelect) return bgColors.select;
    if ($rangeStatus) return bgColors[$rangeStatus];
    return bgColors.default;
  }};

  color: ${({ $isActive, $isSelect, $rangeStatus }) => {
    if ($isSelect || $rangeStatus === "endRange" || $rangeStatus === "startRange") {
      return colors.select;
    }
    if ($rangeStatus === "inRange") {
      return colors.inRange;
    }
    if ($isActive) return colors.active;
    return colors.nonActive;
  }};
`;
