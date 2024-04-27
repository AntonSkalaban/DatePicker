import { createGlobalStyle } from "styled-components";
import OpenSansBold from "assets/fonts/OpenSans-Bold.ttf";
import OpenSansRegulat from "assets/fonts/OpenSans-Regular.ttf";

export const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Open Sans';
  src: url(${OpenSansRegulat}) format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: 'Open Sans';
  src: url(${OpenSansBold}) format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: 'Open Sans';
  src: url(${OpenSansBold}) format('truetype');
  font-weight: 700;
}
`;
