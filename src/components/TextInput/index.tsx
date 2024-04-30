import React, { ChangeEvent, FC, useState } from "react";
import { createPortal } from "react-dom";
import { ClearIcon } from "components/DateInput/styled";
import { StyledContainer, StyledContainerButton } from "components/styled/StyledComponetns";
import { ClearBtn, StyledTextInput, TextInputWrapper } from "./styled";

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
      {isOpen &&
        createPortal(
          <TextInputWrapper>
            <StyledContainer $withBtn={!!value} style={{ height: "100%" }}>
              <ClearBtn onClick={hanldeClearClick}>
                <ClearIcon />
              </ClearBtn>

              <StyledTextInput
                value={value}
                onChange={hanldeChange}
                autoFocus
                placeholder="Todo..."
              />
            </StyledContainer>
            {value && (
              <StyledContainerButton data-testid="save-btn" onClick={hanldeSaveBtnClick}>
                Save
              </StyledContainerButton>
            )}
          </TextInputWrapper>,
          document.getElementById("calendar-wrapper") as HTMLElement,
        )}
    </>
  );
};
