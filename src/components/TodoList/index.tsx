import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { StyledContainer, StyledContainerButton } from "styled";
import { ClearIcon } from "components/DateInput/styled";
import { getArrayFromLS } from "utils/index";
import {
  ClearBtn,
  StyledTextInput,
  StyledTodoList,
  TextInputWrapper,
  TodoListItem,
} from "./styled";

interface TodoListProps {
  date: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TodoList: FC<TodoListProps> = ({ date, isOpen, onClose }) => {
  const [items, setItems] = useState([] as string[]);

  const [value, setValue] = useState("");

  useEffect(() => {
    return setItems(getArrayFromLS<string>(date.toString()));
  }, [date]);

  const hanldeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const hanldeCloseBtnClick = () => {
    onClose();
  };

  const hanldeSaveBtnClick = () => {
    localStorage.setItem(date, JSON.stringify([...items, value]));
    setItems([...items, value]);
    setValue("");
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <TextInputWrapper>
            <StyledContainer $withBtn={!!value}>
              <ClearBtn onClick={hanldeCloseBtnClick}>
                <ClearIcon />
              </ClearBtn>

              <p>{date.toString()}:</p>
              <StyledTodoList>
                {items.map((item, index) => (
                  <TodoListItem key={`${item}-${index}`}>{item}</TodoListItem>
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
                Add
              </StyledContainerButton>
            )}
          </TextInputWrapper>,
          document.getElementById("calendar-wrapper") as HTMLElement,
        )}
    </>
  );
};
