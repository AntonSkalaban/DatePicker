import { styled } from "styled-components";

import Calendar from "assets/img/svg/calendar.svg";
import Clear from "assets/img/svg/close.svg";

export const DateInputContainer = styled.div`
  width: 250px;
  height: 42px;

  position: relative;

  padding: 0px 39px;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 8px;

  margin-bottom: 10px;
`;

export const StyledDateInput = styled.input`
  width: 100%;
  height: 100%;

  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  outline: none;
  border: none;
  padding: 0;
`;

export const CalendarIcon = styled(Calendar)`
  position: absolute;
  top: calc(50% - 8px);
  left: 8px;
`;

export const ClearIcon = styled(Clear)``;

export const ClearBtn = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 8px);
  right: 8px;
  background: transparent;
  border: none;
  width: fit-content;
  height: fit-content;
  padding: 0;
  cursor: pointer;
`;
