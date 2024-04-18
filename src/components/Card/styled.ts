import styled from "styled-components";

export const CardContainer = styled.div<{ disabled?: boolean }>`
  border: 2px dashed #0ebeff;
  border-radius: 20px;
  padding: 12px 24px;
  ${({ disabled }) => (disabled ? `pointer-events: none;` : `cursor: pointer;`)}
`;

export const CardTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
