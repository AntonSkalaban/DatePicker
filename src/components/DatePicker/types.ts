export interface DatePickerProps {
  minDate?: string;
  maxDate?: string;
  isWeekStartFromSun?: boolean;
  withDateSelect?: boolean;
  withDateRange?: boolean;
  withTodo?: boolean;
  showWeekendsAndHoliday?: boolean;
  holidayColor?: "red" | "blue" | "green";
}
