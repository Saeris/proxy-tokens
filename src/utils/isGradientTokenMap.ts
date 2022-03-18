import type { GradientTokenMap } from "../createLinearGradient";
import { isObject } from "./isObject";
import { isGradientToken } from "./isGradientToken";

export const isGradientTokenMap = <T extends Record<string, unknown>>(val: unknown): val is GradientTokenMap<T> =>
  isObject(val) && Object.values(val).every((value) => isGradientToken(value));
