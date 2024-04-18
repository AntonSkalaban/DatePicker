import  { FC } from "react";
import { CardContainer, CardTitle } from "./styled";

 interface CardProps {
    /** Заголовок карточки */
    title: string;
    /** Обработчик клика по карточке */
    onClick: () => void;
    /** Флаг блокировки карточки  */
    disabled?: boolean;
}

/** Интерактивная карточка */
export const Card: React.FC<CardProps> = ({ title, onClick, disabled }) => (
  <CardContainer
    onClick={onClick}
    disabled={disabled}
  >
    <CardTitle>{title}</CardTitle>
  </CardContainer>
);