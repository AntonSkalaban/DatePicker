import { ViewType } from "types/index";

export interface TitleProps {
  changeView: (view: ViewType, openDate?: Date) => void;
}
