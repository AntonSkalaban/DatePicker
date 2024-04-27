export interface CalendarGrid {
  date: Date;
  isSelect: boolean;
  rangeStatus: "startRange" | "inRange" | "endRange" | "";
  isHoliday: boolean;
  isWeekend: boolean;
}
