import { ViewType } from "types";

import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { YearView } from "./YearNew";

export const calenadar: {
  [key in ViewType]: (changeView: (viewType: ViewType, openDate?: Date) => void) => JSX.Element;
} = {
  day: (changeView: (viewType: ViewType, openDate?: Date) => void) => (
    <DayView changeView={changeView} />
  ),
  month: (changeView: (viewType: ViewType, openDate?: Date) => void) => (
    <MonthView changeView={changeView} />
  ),
  year: (changeView: (viewType: ViewType, openDate?: Date) => void) => (
    <YearView changeView={changeView} />
  ),
};
