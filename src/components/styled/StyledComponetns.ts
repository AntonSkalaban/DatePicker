import { styled } from "styled-components";

export const StyledContainer = styled.div<{ $withBtn: boolean }>`
  width: 250px;

  padding: 5px;

  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: ${({ $withBtn }) => ($withBtn ? " 8px 8px 0 0" : "8px")};
`;

export const StyledContainerButton = styled.button`
  width: 250px;
  padding: 10px 0px 10px 0px;

  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 0 0 8px 8px;

  font-weight: 400;
`;
