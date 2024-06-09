import { ViewType } from "types/index";

export interface DayViewProps {
  changeView: (viewType: ViewType, openDate?: Date) => void;
}
