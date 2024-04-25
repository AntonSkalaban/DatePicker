import { styled } from "styled-components";

export const CalendarWrapper = styled.div`
  position: relative;
`;
export const StyledCalendar = styled.div<{ $withBtn: boolean }>`
  /* display: flex;

  justify-content: center; */

  width: 250px;
  /* height: 273px; */

  padding: 5px;

  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: ${({ $withBtn }) => ($withBtn ? " 8px 8px 0 0" : "8px")};
`;
