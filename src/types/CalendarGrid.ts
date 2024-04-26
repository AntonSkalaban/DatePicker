export interface CalendarGrid {
  date: Date;
  isActive: boolean;
  rangeStatus: "startRange" | "inRange" | "endRange" | "";
  isHoliday: boolean;
  isWeekend: boolean;
}
