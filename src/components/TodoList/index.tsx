import { ChangeEvent, FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { StyledContainer, StyledContainerButton } from "styled";
import { ClearIcon } from "components/Calendar/DayView/DayCalendar/DateInput/styled";

import { TodoListProps } from "./types";
import {
  ClearBtn,
  StyledTextInput,
  StyledTodoList,
  TextInputWrapper,
  TodoListItem,
} from "./styled";

export const TodoList: FC<TodoListProps> = ({ todoData, onClose, addTodo }) => {
  const [value, setValue] = useState("");

  const hanldeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const hanldeCloseBtnClick = () => {
    onClose();
  };

  useEffect(() => {
    setValue("");
  }, [todoData]);

  const hanldeSaveBtnClick = () => {
    const newTodos = [...todoData.todo, value];
    addTodo({ date: todoData.date, todo: newTodos });
    localStorage.setItem("todos", JSON.stringify([{ date: todoData.date, todo: newTodos }]));
  };

  return createPortal(
    <TextInputWrapper>
      <StyledContainer $withBtn={!!value}>
        <ClearBtn onClick={hanldeCloseBtnClick}>
          <ClearIcon />
        </ClearBtn>

        <p>{todoData.date.toString()}:</p>
        <StyledTodoList>
          {todoData.todo.map((todo, index) => (
            <TodoListItem key={`${todo}-${index}`}>{todo}</TodoListItem>
          ))}
        </StyledTodoList>

        <StyledTextInput
          value={value}
          onChange={hanldeChange}
          autoFocus
          placeholder="Add task..."
        />
      </StyledContainer>

      {value && (
        <StyledContainerButton data-testid="save-btn" onClick={hanldeSaveBtnClick}>
          Save
        </StyledContainerButton>
      )}
    </TextInputWrapper>,
    document.getElementById("calendar-wrapper") as HTMLElement,
  );
};
