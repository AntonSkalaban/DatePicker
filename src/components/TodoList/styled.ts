import { styled } from "styled-components";

export const TextInputWrapper = styled.div`
  height: 100%;

  position: absolute;
  top: 0px;
  left: -265px;
`;

export const StyledTextInput = styled.textarea`
  width: 100%;
  max-height: 100%;
  min-height: 42px;
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
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  width: fit-content;
  height: fit-content;
  padding: 0;
  cursor: pointer;
`;

export const StyledTodoList = styled.ul`
  max-height: 150px;
  overflow: scroll;
  list-style: inside;
`;

export const TodoListItem = styled.li`
  overflow-wrap: break-word;
`;
