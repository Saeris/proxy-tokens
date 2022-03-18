import type { DesignTokenMap } from "../createDesignTokens";
import { isObject } from "./isObject";
import { isNested } from "./isNested";

export const isDesignTokens = (val: unknown): val is DesignTokenMap =>
  isObject(val) && !isNested(val) && typeof (val as DesignTokenMap).prefix === `string`;
