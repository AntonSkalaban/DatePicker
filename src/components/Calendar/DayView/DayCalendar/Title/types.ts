import { ViewType } from "types/index";

export interface TitleProps {
  cuurentDate: Date;
  changeOpenMonth: (date: Date) => void;
  changeView: (view: ViewType) => void;
}
