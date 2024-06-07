import { CalendarGrid } from "types";

export interface CalendarProps {
  calendarGrid: CalendarGrid[][];
  changeOpenFullDate: (date: Date) => void;
  withClearBtn: boolean;
}
