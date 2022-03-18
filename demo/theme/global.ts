import { createGlobalStyle, css } from "styled-components";
import { reset } from "./reset";

export const Global = createGlobalStyle(
  ({ theme }) => css`
    ${theme.toJSON()}
    ${reset}

    div, section, article, main, aside, body {
      display: flex;
      flex-direction: column;
    }

    body {
      font-family: ${theme.fonts.body};
      font-size: 1.4rem;
      background-color: ${theme.colors.Neutral[800]};
      color: ${theme.colors.Neutral[100]};
    }

    #__next {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
    }
  `
);
