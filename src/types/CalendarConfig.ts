export interface CalendarConfig {
  openDate: Date;
  minDate: Date;
  maxDate: Date;
  isWeekStartFromSun: boolean;
  withJumpByEnteredDate: boolean;
  withDateRange: boolean;
  withTodo: boolean;
  showWeekendsAndHoliday: boolean;
  selectDate: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}
