import { ViewType } from "types/index";

import { DayView } from "./DayView";

export const calenadar: {
  [key in ViewType]: (changeView: (viewType: ViewType) => void) => JSX.Element;
} = {
  day: (changeView: (viewType: ViewType) => void) => <DayView changeView={changeView} />,
  month: (changeView: (viewType: ViewType) => void) => <DayView changeView={changeView} />,
  year: (changeView: (viewType: ViewType) => void) => <DayView changeView={changeView} />,
};
