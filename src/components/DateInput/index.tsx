import React, { memo, useState } from "react";
import { CalendarIcon, ClearBtn, ClearIcon, DateInputContainer, StyledDateInput } from "./styled";

const getValidationError = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { isError: true, message: "Date error" };
  }

  if (month < 1 || month > 12) {
    return { isError: true, message: "Month error" };
  }
  return { isError: false, message: "" };
};

interface DateInputProps {
  value: string;
  title: string;
  onSubmit: (value: string) => void;
}

const getInpuWithMask = (value: string) => {
  const newValue = value.replace(/\D/g, "");

  if (newValue.length <= 2) return newValue;

  if (newValue.length <= 4) return newValue.replace(/(\d{2})(\d{0,2})/, "$1/$2");

  return newValue.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
};

export const DateInput: React.FC<DateInputProps> = memo(({ value, title, onSubmit }) => {
  const [date, setDate] = useState(value);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    let value = e.target.value;

    if (value.length >= 10) {
      value = value.slice(0, 10);
      const { isError, message } = getValidationError(value);
      if (isError) {
        setIsError(true);
        setErrorMessage(message);
      } else {
        onSubmit(value);
      }
    }

    setDate(getInpuWithMask(value));
  };

  const hanldeClearClick = () => {
    setDate("");
    setIsError(false);
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
      {isError && <p>{errorMessage}</p>}
    </div>
  );
});
