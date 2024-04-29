import React, { memo, useState } from "react";
import { getInputMask } from "utils/helpers/getInputMask";
import { CalendarIcon, ClearBtn, ClearIcon, DateInputContainer, StyledDateInput } from "./styled";

interface DateInputProps {
  value: string;
  title: string;
  errorMessage: string;
  onSubmit: (value: string) => void;
  removeErrorMessage: () => void;
}

export const DateInput: React.FC<DateInputProps> = memo(
  ({ value, title, errorMessage, onSubmit, removeErrorMessage }) => {
    const [date, setDate] = useState(value);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (errorMessage) removeErrorMessage();
      let value = e.target.value;

      if (value.length >= 10) {
        value = value.slice(0, 10);
        onSubmit(value);
      }
      setDate(getInputMask(value));
    };

    const hanldeClearClick = () => {
      setDate("");
      removeErrorMessage();
    };

    return (
      <div>
        <p>{title}</p>
        <DateInputContainer>
          <CalendarIcon />
          <StyledDateInput value={date} onChange={handleDateChange} />
          {date && (
            <ClearBtn onClick={hanldeClearClick}>
              <ClearIcon />
            </ClearBtn>
          )}
        </DateInputContainer>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  },
);
