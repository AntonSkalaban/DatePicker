import { styled } from "styled-components";

export const CalendarButton = styled.button<{ $isActive?: boolean }>`
  width: 32px;
  height: 32px;

  background: #ffffff;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;

  color: ${({ $isActive }) => ($isActive ? "#333333;" : " #aaaaaa;")};
`;
