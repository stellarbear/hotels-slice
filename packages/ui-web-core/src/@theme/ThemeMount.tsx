import * as React from "react";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {theme} from "./Theme";
import {ScrollbarStyle} from "./ThemeScrollbar";

type Props = {
  children: React.ReactNode;
};

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
  }
  body, html, #root {
    height: 100%;
  }

  body, html {
    font-family: "Jost", sans-serif;;
  }

  svg {
    display: block;
  }
`;

export const ThemeMount = React.memo<Props>((props) => {
  const {children} = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScrollbarStyle />
      {children}
    </ThemeProvider>
  );
});
