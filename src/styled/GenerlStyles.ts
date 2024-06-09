import { createGlobalStyle } from "styled-components";

export const GeneralStyles = createGlobalStyle`
    body {
        font-family: "Open Sans", sans-serif;;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #000000;
    }

    button {
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
  `;
