import type { RawTokens } from "../types";
import { isObject } from "./isObject";
import { isGradientToken } from "./isGradientToken";

export const isRawTokens = (val: unknown): val is RawTokens =>
  isObject(val) && Object.values(val).every((value) => isGradientToken(value) || !isObject(value));
