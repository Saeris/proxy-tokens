import { createDesignTokens } from "./createDesignTokens";
import type { MappedTokens, ObjectConstructor, ProxyTheme } from "./types";
import { addDash, isObject, isDesignTokens, isGradientTokenMap, isRawTokens, isGradientToken } from "./utils";

export const mapTokens = <T extends object>(tokens: T): MappedTokens<T> => {
  const recurse = <I extends object>(input: I | MappedTokens<I>, head = ``): MappedTokens<T> =>
    Object.entries(input).reduce((obj, [key, value]) => {
      const prefix = addDash(head, key);
      if (isRawTokens(value)) {
        if (isGradientTokenMap(value)) {
          Object.entries(value).forEach(([name, token]) => {
            if (isGradientToken(token)) {
              token.prefix = addDash(prefix, name);
            }
          });
        }
        obj[key] = (Object as ObjectConstructor).defineProperties(createDesignTokens(value), {
          prefix: { value: prefix, configurable: true }
        });
      } else {
        obj[key] = recurse(value, prefix);
      }
      return obj;
    }, {}) as MappedTokens<T>;

  return recurse(tokens);
};

export const createProxyTheme = <T extends object, P extends PropertyDescriptorMap>(
  map: T,
  props: P
): ProxyTheme<T, P> =>
  (Object as ObjectConstructor).defineProperties(mapTokens(map), {
    ...props,
    toJSON: {
      value: function toJSON() {
        const serialize = <I extends object>(val: MappedTokens<I>): string[] => {
          if (isDesignTokens(val)) {
            return val.toJSON(this);
          }
          // Recurse on nested objects, flatten out all of the resulting
          // arrays as we travel back up the tree
          return Object.values(val)
            .map((v) => serialize(v as MappedTokens<MappedTokens<I>[keyof I]>))
            .flat();
        };
        // For each key in the root theme, walk down until
        // a DesignTokens object is found, then serialize it
        return `:root {\n\t${Object.values(this)
          .reduce<string[]>(
            (arr, val) =>
              // Skip over methods
              typeof val === `function` || !isObject(val) ? arr : [...arr, ...serialize(val as MappedTokens<T>)],
            new Array<string>()
          )
          .join(`\n\t`)}\n}`;
      }
    }
  }) as ProxyTheme<T, P>;
