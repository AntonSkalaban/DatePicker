export interface CalendarConfig {
  openDate: Date;
  fromDate: Date;
  toDate: Date;
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
