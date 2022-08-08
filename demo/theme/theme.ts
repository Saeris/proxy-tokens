import type { MappedTokens } from "../../src";
import { createProxyTheme, tracking, media } from "../../src";
import { breakpoints } from "./breakpoints";
import { gradients, colors } from "./colors";
import { spacing, corners } from "./spacing";
import { styles, fonts, sizes, weights } from "./typography";

export interface Theme
  extends MappedTokens<{
    colors: typeof colors;
    spacing: typeof spacing;
    corners: typeof corners;
    fonts: typeof fonts;
    sizes: typeof sizes;
    weights: typeof weights;
    gradients: typeof gradients;
  }> {
  styles: typeof styles;
  media: typeof media;
  breakpoints: typeof breakpoints;
  tracking: typeof tracking;
  toJSON: () => string;
}

export const theme = createProxyTheme(
  // Serialized to CSS Variables
  {
    colors,
    spacing,
    corners,
    fonts,
    sizes,
    weights,
    gradients
  },
  // Non-serializeable styles and
  // utility functions
  {
    styles: {
      value: styles
    },
    media: {
      value: media
    },
    breakpoints: {
      value: breakpoints
    },
    tracking: {
      value: tracking
    }
  }
);
