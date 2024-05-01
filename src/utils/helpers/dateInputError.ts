import { isDateInRange, isDateValid, isMonthValid, isRangeCorrect } from "./dateInputValidations";
import { dateStrToFullDate } from "./helpers";

export const defaultDateInputValidation = (dateStr: string, minDate: Date, maxDate: Date) => {
  if (!isDateValid(dateStr)) {
    return "Введенная дата не является допустимой датой";
  }

  if (!isMonthValid(dateStr)) {
    return "Введенный месяц не является допустимым";
  }

  if (!isDateInRange(dateStr, minDate, maxDate)) {
    return "Введенная дата выходит за пределы допустимого диапазона";
  }
};

export const dateRangeValidation = (
  dateStr: string,
  minDate: Date,
  maxDate: Date,
  startRange: string,
  endRange: string,
) => {
  const defaultError = defaultDateInputValidation(dateStr, minDate, maxDate);
  if (defaultError) return defaultError;

  if (
    startRange &&
    endRange &&
    !isRangeCorrect(dateStrToFullDate(startRange), dateStrToFullDate(endRange))
  ) {
    return "Неверный диапазон дат";
  }
};
