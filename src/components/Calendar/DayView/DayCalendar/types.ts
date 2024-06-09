import { CalendarGrid, ViewType } from "types";

export interface DayCalendarProps {
  calendarGrid: CalendarGrid[][];
  withClearBtn: boolean;
  addTodo: ({ date, todo }: { date: string; todo: string[] }) => void;
  changeView: (viewType: ViewType, openDate?: Date) => void;
}
