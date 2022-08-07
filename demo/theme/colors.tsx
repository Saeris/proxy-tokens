import type { GradientTokenMap } from "../../src";
import { GradientToken } from "../../src";

export const colors = {
  Neutral: {
    100: `#dce3eb`,
    200: `#bcc3cb`,
    300: `#969fa8`,
    400: `#747d88`,
    500: `#555d67`,
    600: `#393f47`,
    700: `#2b3139`,
    800: `#1e242c`,
    900: `#0f161e`
  },
  Primary: {
    100: `#e8e4f8`,
    200: `#dad1fd`,
    300: `#cabdff`,
    400: `#a193e3`,
    500: `#6f62b4`,
    600: `#524795`,
    700: `#3d3578`,
    800: `#2e2958`,
    900: `#16142e`,
    Highlight: `#6f62b4`
  },
  Accent: {
    100: `#fbe6d3`,
    200: `#fcceaa`,
    300: `#f4af79`,
    400: `#e08e4d`,
    500: `#bf6e2d`,
    600: `#9c561e`,
    700: `#763f16`,
    800: `#4c2812`,
    900: `#1f0c00`,
    Highlight: `#ff9540`
  },
  Success: {
    100: `#dbe6d3`,
    200: `#b8cdaa`,
    300: `#8da57d`,
    400: `#688457`,
    500: `#4f6a40`,
    600: `#324925`,
    700: `#233818`,
    800: `#1a2a11`,
    900: `#171e13`,
    Highlight: `#47c600`
  },
  Warning: {
    100: `#ede1cd`,
    200: `#d0ba95`,
    300: `#a48b5b`,
    400: `#917435`,
    500: `#7d6018`,
    600: `#644b03`,
    700: `#483500`,
    800: `#382b0c`,
    900: `#2b2005`,
    Highlight: `#ffbd00`
  },
  Error: {
    100: `#f3dddb`,
    200: `#e2b6b2`,
    300: `#c48681`,
    400: `#a1605b`,
    500: `#824642`,
    600: `#5b302d`,
    700: `#4a2320`,
    800: `#381b19`,
    900: `#22110f`,
    Highlight: `#ff1100`
  },
  Info: {
    100: `#d5e5f2`,
    200: `#a5c8e2`,
    300: `#77a6c6`,
    400: `#4e85a7`,
    500: `#366f90`,
    600: `#1a506c`,
    700: `#073a51`,
    800: `#06293b`,
    900: `#071923`,
    Highlight: `#00a8ff`
  }
} as const;

export type Colors = typeof colors;

const darkGradients = (color: keyof Colors): GradientTokenMap<Colors> => ({
  hover: new GradientToken(color, 500, 700),
  default: new GradientToken(color, 600, 800),
  disabled: new GradientToken(color, 700, 900)
});

const lightGradients = (color: keyof Colors): GradientTokenMap<Colors> => ({
  hover: new GradientToken(color, 100, 300, 180),
  default: new GradientToken(color, 300, 400, 180),
  disabled: new GradientToken(color, 600, 700, 180)
});

const verticalGradients = (color: keyof Colors): Record<"dark" | "light", GradientTokenMap<Colors>> => ({
  dark: darkGradients(color),
  light: lightGradients(color)
});

export const gradients = {
  vertical: {
    Neutral: verticalGradients(`Neutral`),
    Primary: verticalGradients(`Primary`),
    Accent: verticalGradients(`Accent`),
    Success: verticalGradients(`Success`),
    Warning: verticalGradients(`Warning`),
    Error: verticalGradients(`Error`),
    Info: verticalGradients(`Info`)
  }
};
