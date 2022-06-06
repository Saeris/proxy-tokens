<h1 align="center" style="display: block; text-align: center;">🎊 Proxy Tokens</h1>
<p align="center"><a href="https://www.npmjs.org/package/@saeris/proxy-tokens"><img src="https://img.shields.io/npm/v/@saeris/proxy-tokens.svg?style=flat" alt="npm"></a><a href="https://github.com/Saeris/proxy-tokens/actions/workflows/test.yml"><img src="https://github.com/Saeris/proxy-tokens/actions/workflows/test.yml/badge.svg" alt="Node.js CI"></a><a href="https://codecov.io/gh/Saeris/proxy-tokens"><img src="https://codecov.io/gh/Saeris/proxy-tokens/branch/master/graph/badge.svg" alt="codecov"/></a></p>
<p align="center">Design Token utilities for generating CSS Variables</p>

---

## 📦 Installation

```bash
npm install --save-dev @saeris/proxy-tokens
```

**or**

```bash
yarn add -D @saeris/proxy-tokens
```

## 🔧 Usage

First, define your theme. `createProxyTheme` will walk your theme object tree, looking for objects who's keys all have values of `string | number | string[] | number[]` or the return of a `styled-components` `css()` function (see [`src/types.ts`](/src/types.ts) for more info).

Objects that match that criteria will be augmented with a custom serializer method and wrapped in a Proxy, which will intercept property access. You can continue to use the `theme` prop inside of `styled` and `css` as you normally would.

Behind the scenes, these values will be transformed into CSS variable references, ex: `var(--colors-neutral-100);`

> theme.ts

```typescript
import { css } from "styled-components";
import { createProxyTheme, tracking } from "@saeris/proxy-tokens";

export const theme = createProxyTheme(
  // Serialized to CSS Variables
  {
    colors: {
      neutral: {
        100: `#dce3eb`,
        200: `#bcc3cb`,
        300: `#969fa8`,
        400: `#747d88`,
        500: `#555d67`,
        600: `#393f47`,
        700: `#2b3139`,
        800: `#1e242c`,
        900: `#0f161e`
      }
    },
    spacing: {
      4: `0.4rem`,
      8: `0.8rem`,
      12: `1.2rem`,
      16: `1.6rem`,
      24: `2.4rem`,
      32: `3.2rem`
    },
    fonts: {
      display: [`Encode Sans`, `-apple-system`, `Helvetica`, `Arial`, `sans-serif`],
      body: [`Noto Sans`, `-apple-system`, `Helvetica`, `Arial`, `sans-serif`]
    },
    sizes: {
      12: `1.2rem`,
      14: `1.4rem`,
      18: `1.8rem`,
      24: `2.4rem`,
      36: `3.6rem`,
      48: `4.8rem`
    },
    weights: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    }
  } as const,
  // Non-serializeable styles and utility functions
  {
    // Share re-used css rulesets
    styles: {
      value: {
        label: css(
          ({ theme }) => css`
            font-family: ${theme.fonts.body};
            font-size: ${theme.sizes[14]};
            font-weight: ${theme.weights.semibold};
            letter-spacing: ${theme.tracking(5)};
            font-variant: small-caps;
          `
        )
      }
    },
    // Add theme utility functions
    tracking: {
      value: tracking
    }
  }
);
```

Second, you must create a global style and render it at the root of your application's component tree. This will take all of your design tokens and serialize them as CSS variable declarations, using the keys of you theme's object structure as a naming prefix. For example, ` --colors-neutral-100: #dce3eb;`

> global.ts

```typescript
import { ThemeProvider, createGlobalStyle, css } from "styled-components";
import { theme } from "./theme";

const Global = createGlobalStyle(
  ({ theme }) => css`
    /* serializes your theme, creating CSS variable declarations in :root {} */
    ${theme.toJSON()}/* other global styles */
  `
);

export const App = () => (
  <ThemeProvider theme={theme}>
    <Global />
    [/* the rest of your app */]
  </ThemeProvider>
);
```

Finally, for Typescript, intellisense, and autocomplete support, you will need to extend the default theme.

> styled-components.d.ts

```typescript
import { theme } from "./theme";

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
```

## 🥂 License

Released under the [MIT license](/LICENSE).
