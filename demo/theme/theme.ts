import { createProxyTheme, tracking, media } from "../../src";
import { breakpoints } from "./breakpoints";
import { gradients, colors } from "./colors";
import { spacing, corners } from "./spacing";
import { styles, fonts, sizes, weights } from "./typography";

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
