import { isObject } from "./isObject";

export const isNested = (val: unknown): boolean =>
  isObject(val) && Object.values(val).every((value) => isObject(value));
