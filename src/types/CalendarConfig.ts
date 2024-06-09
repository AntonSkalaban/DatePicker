export type ViewType = "day" | "month" | "year";
export interface DayCalendarSettings {
  cuurentDate: Date;
  selectDate: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  todos: { date: string; todo: string[] }[];
}
export interface CalendarConfig {
  minDate: Date;
  maxDate: Date;
  isWeekStartFromSun: boolean;
  withDateSelect: boolean;
  withDateRange: boolean;
  withTodo: boolean;
  showWeekendsAndHoliday: boolean;
  holidayColor: "red" | "blue" | "green";
}

export interface DayCalendarConfig extends DayCalendarSettings, CalendarConfig {}
