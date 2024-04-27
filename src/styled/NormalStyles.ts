import { createGlobalStyle } from "styled-components";

export const NormalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

ul,
ol {
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
h5,
p,
ul,
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

ul,
ol {
  list-style: none;
  padding: 0;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
  
}
img {
  width: 100%;
  display: block;
}

article > * + * {
  margin-top: 1em;
}

input,
button,
textarea,
select {
  font: inherit;
  padding: 0;
  margin: 0;
}

button {
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

a {
  text-decoration: none;
}
`;
