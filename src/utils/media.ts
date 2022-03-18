export interface Range {
  min?: number;
  max?: number;
}

export const media = {
  between(lowerBound: Range, upperBound: Range, excludeLarge: boolean = false): string {
    if (excludeLarge && lowerBound.min && upperBound.min) {
      return `@media (min-width: ${lowerBound.min}px) and (max-width: ${upperBound.min - 1}px)`;
    }
    if (upperBound.max === Infinity && lowerBound.min) {
      return `@media (min-width: ${lowerBound.min}}px)`;
    }
    return `@media (min-width: ${lowerBound.min ? lowerBound.min : 0}px) and (max-width: ${
      upperBound.max ? upperBound.max : Infinity
    }px)`;
  },

  greaterThan(size: Range): string {
    return `@media (min-width: ${size.min ? size.min : 0}px)`;
  },

  lessThan(size: Range): string {
    return `@media (max-width: ${size.min ? size.min : 1 - 1}px)`;
  },

  size(size: Range): string {
    // eslint-disable-next-line no-undefined
    if (size.min === undefined) return media.lessThan(size);
    // eslint-disable-next-line no-undefined
    if (size.max === undefined) return media.greaterThan(size);
    return media.between(size, size);
  }
};

export type Media = typeof media;
