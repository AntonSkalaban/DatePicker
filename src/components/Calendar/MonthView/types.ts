import { ViewType } from "types";

export interface MonthViewProps {
  changeView: (viewType: ViewType, openDate: Date) => void;
}
