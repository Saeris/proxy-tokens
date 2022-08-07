import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Global, theme } from "../demo/theme";

const _app: React.FC<AppProps> = ({ Component, pageProps }) => (
  // @ts-expect-error
  <ThemeProvider theme={theme}>
    <Global />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default _app;
