import { styled } from "styled-components";

export const StyledCalendar = styled.section`
  box-sizing: border-box;

  display: flex;
  /* align-items: center; */
  justify-content: center;

  position: absolute;
  width: 250px;
  height: 273px;
  left: 70px;
  top: 46px;

  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
`;

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
