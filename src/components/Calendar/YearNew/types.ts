import { ViewType } from "types";

export interface YearViewProps {
  changeView: (viewType: ViewType, openDate?: Date) => void;
}
