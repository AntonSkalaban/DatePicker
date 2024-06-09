import { CalendarGrid, ViewType } from "types";

export interface DayCalendarProps {
  cuurentDate: Date;
  calendarGrid: CalendarGrid[][];
  changeOpenFullDate: (date: Date) => void;
  withClearBtn: boolean;
  addTodo: ({ date, todo }: { date: string; todo: string[] }) => void;
  changeView: (view: ViewType) => void;
}
