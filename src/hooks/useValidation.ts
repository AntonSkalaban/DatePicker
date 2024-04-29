import { useState } from "react";

export const useValidation = (validators: ((date: string) => string)[]) => {
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (date: string) => {
    const errorMessage = validators.find((validator) => validator(date));
    if (errorMessage) setErrorMessage(errorMessage);
  };

  return [errorMessage, validate];
};
