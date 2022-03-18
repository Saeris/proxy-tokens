import { GradientToken } from "../createLinearGradient";
import { isObject } from "./isObject";

export const isGradientToken = <T extends Record<string, unknown>>(val: unknown): val is GradientToken<T> =>
  isObject(val) && val instanceof GradientToken;
