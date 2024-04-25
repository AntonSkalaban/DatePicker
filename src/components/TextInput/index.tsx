import React, { ChangeEvent, FC, useState } from "react";
import { ClearIcon } from "components/DateInput/styled";
import { ClearBtn, SaveButton, StyledTextInput, TextInputWrapper } from "./styled";

interface TextInputProps {
  date: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TextInput: FC<TextInputProps> = ({ date, isOpen, onClose }) => {
  const [value, setValue] = useState(localStorage.getItem(date) || "");

  const hanldeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const hanldeClearClick = () => {
    setValue("");
    onClose();
  };

  const hanldeSaveBtnClick = () => {
    localStorage.setItem(date, value);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <TextInputWrapper $withBtn={!!value}>
          <ClearBtn onClick={hanldeClearClick}>
            <ClearIcon />
          </ClearBtn>

          <StyledTextInput value={value} onChange={hanldeChange} placeholder="Todo..." />
          {value && <SaveButton onClick={hanldeSaveBtnClick}>Save</SaveButton>}
        </TextInputWrapper>
      )}
    </>
  );
};
