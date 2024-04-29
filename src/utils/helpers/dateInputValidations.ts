import { dateStrToFullDate } from "./helpers";

export const isDateValid = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/").map(Number);

  const daysInMonth = new Date(year, month, 0).getDate();
  return !(day < 1 || day > daysInMonth);
};

export const isMonthValid = (dateStr: string) => {
  const [, month] = dateStr.split("/").map(Number);

  return !(month < 1 || month > 12);
};

export const isDateInRange = (dateStr: string, minDate: Date, maxDate: Date) => {
  const date = dateStrToFullDate(dateStr);
  const dateMs = date.getTime();
  const minDateMs = minDate.getTime();
  const maxDateMs = maxDate.getTime();

  return dateMs >= minDateMs && dateMs <= maxDateMs;
};

export const isRangeCorrect = (minDate: Date, maxDate: Date) => {
  const minDateMs = minDate.getTime();
  const maxDateMs = maxDate.getTime();

  return minDateMs < maxDateMs;
};

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
