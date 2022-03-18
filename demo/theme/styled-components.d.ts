// @ts-check
import { CSSProp } from "styled-components"; // eslint-disable-line
import type { theme } from "./theme";

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {} // eslint-disable-line
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp;
    }
  }
}
