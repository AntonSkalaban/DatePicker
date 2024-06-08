import { Calendar } from "utils";
import { CalendarConfig, CalendarGrid } from "types";

export class TodoDecorator {
  private calendar;
  private todos;
  config: CalendarConfig = {} as CalendarConfig;

  constructor(calendar: Calendar, todos: { date: string; todo: string[] }[]) {
    this.calendar = calendar;
    this.todos = todos;
  }

  getGrid(): CalendarGrid[][] {
    const grid = this.calendar.getGrid();
    return TodoDecorator.getGridWithTodos(grid, this.todos);
  }

  static getGridWithTodos = (
    calendargrid: CalendarGrid[][],
    todos: { date: string; todo: string[] }[],
  ) => {
    return calendargrid.map((week) => {
      return week.map((day) => ({
        ...day,
        todo: todos?.find(({ date }) => date === day.date.toDateString())?.todo || null,
      }));
    });
  };
}
