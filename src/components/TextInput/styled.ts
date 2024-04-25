import { styled } from "styled-components";

export const TextInputWrapper = styled.div<{ $withBtn?: boolean }>`
  width: 250px;
  height: 273px;

  position: absolute;
  top: -55px;
  left: -265px;
  padding: 5px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: ${({ $withBtn }) => ($withBtn ? " 8px 8px 0 0" : "8px")};
`;

export const StyledTextInput = styled.textarea`
  width: 100%;
  height: 100%;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  outline: none;
  border: none;
  padding: 0;

  resize: none;
`;

export const ClearBtn = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  /* top: calc(50% - 8px); */
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  width: fit-content;
  height: fit-content;
  padding: 0;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  width: 250px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 270px;
  left: -1px;
`;
