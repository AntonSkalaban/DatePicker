export const getDDMMYYFromDate = (date: Date) => {
  return date.toLocaleDateString("ru-RU").split(".");
};

export const dateStrToFullDate = (dateStr: string) => {
  const [dd, mm, yy] = dateStr.split("/").map(Number);
  return new Date(yy, mm - 1, dd);
};

export const getDatesRange = (startDate: Date, endDate: Date) => {
  const datesArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
};

export const getNumbersInRange = (start: number, end: number) => {
  return Array.from({ length: end - start }).map((_, i) => start + i);
};
