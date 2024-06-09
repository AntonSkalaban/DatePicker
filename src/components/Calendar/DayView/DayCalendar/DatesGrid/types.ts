import { CalendarGrid } from "types/index";

export interface DatesGridProps {
  cuurentDate: Date;
  dates: CalendarGrid[][];
  addTodo: ({ date, todo }: { date: string; todo: string[] }) => void;
}
