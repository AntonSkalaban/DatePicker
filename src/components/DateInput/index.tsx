import React, { memo, useState } from "react";
import { CalendarIcon, ClearBtn, ClearIcon, DateInputContainer, StyledDateInput } from "./styled";

const getValidationStatus = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);

  const daysInMonth = new Date(year, month, 0).getDate();

  if (day < 1 || day > daysInMonth) {
    return { isError: true, message: "Date error" };
  }

  if (month < 1 || month > 12) {
    return { isError: true, message: "Month error" };
  }
  return { isError: false, message: "Success" };
};

interface DateInputProps {
  value: string;
  title: string;
  onSubmit: (value: string) => void;
}
// eslint-disable-next-line react/display-name
export const DateInput: React.FC<DateInputProps> = memo(({ value, title, onSubmit }) => {
  const [date, setDate] = useState(value);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    let input = e.target.value;

    if (input.length >= 10) {
      input = input.slice(0, 10);
      const { isError, message } = getValidationStatus(input);
      if (isError) {
        setIsError(true);
        setErrorMessage(message);
      } else {
        onSubmit(input);
      }
    }

    input = input.replace(/\D/g, "");

    if (input.length <= 2) {
      setDate(input);
    } else if (input.length <= 4) {
      setDate(input.replace(/(\d{2})(\d{0,2})/, "$1/$2"));
    } else {
      setDate(input.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3"));
    }
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
