import { CalendarGrid } from "types";

export interface CalendarProps {
  calendarGrid: CalendarGrid[][];
  changeOpenFullDate: (date: Date) => void;
  withClearBtn: boolean;
  addTodo: ({ date, todo }: { date: string; todo: string[] }) => void;
}
