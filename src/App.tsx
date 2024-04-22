import React from "react";
import { Calendar } from "components";
import { GeneralStyles, NormalStyles } from "./styled";

export const App: React.FC = () => {
  return (
    <>
      <GeneralStyles />
      <NormalStyles />
      <Calendar />
    </>
  );
};
