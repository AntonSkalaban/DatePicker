import { CalendarGrid } from "types/index";

export interface DatesGridProps {
  dates: CalendarGrid[][];
  addTodo: ({ date, todo }: { date: string; todo: string[] }) => void;
}
