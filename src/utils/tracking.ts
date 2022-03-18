/**
 * Calculates a CSS Letter Spacing Value given a Tracking Value common in Adobe Programs
 */
export const tracking = (value: number): string => `calc((${value} / 100)* 1em)`;
