import { FC } from "react";

import { getInputMask } from "utils";

import { DateInputProps } from "./types";
import { CalendarIcon, ClearBtn, ClearIcon, DateInputContainer, StyledDateInput } from "./styled";

export const DateInput: FC<DateInputProps> = ({ value, title, errorMessage, testId, onSubmit }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length >= 10) value = value.slice(0, 10);
    const valueMask = getInputMask(value);
    onSubmit(valueMask);
  };

  const hanldeClearClick = () => {
    onSubmit("");
  };

  return (
    <div>
      <p>{title}</p>
      <DateInputContainer>
        <CalendarIcon />
        <StyledDateInput autoFocus value={value} data-testid={testId} onChange={handleDateChange} />
        {value && (
          <ClearBtn onClick={hanldeClearClick}>
            <ClearIcon />
          </ClearBtn>
        )}
      </DateInputContainer>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
