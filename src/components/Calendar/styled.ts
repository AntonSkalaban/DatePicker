import { styled } from "styled-components";

export const StyledCalendar = styled.div<{ $withBtn: boolean }>`
  box-sizing: border-box;

  display: flex;

  justify-content: center;

  width: 250px;
  height: 273px;

  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: ${({ $withBtn }) => ($withBtn ? " 8px 8px 0 0" : "8px")};
`;
