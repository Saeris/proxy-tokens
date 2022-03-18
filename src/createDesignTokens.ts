import { GradientToken } from "./createLinearGradient";
import type { Token, ObjectConstructor, DefinePropertiesReturn } from "./types";

export interface DesignTokenMapMethods extends PropertyDescriptorMap {
  toJSON: {
    value: (theme?: unknown) => string[];
  };
}

export interface DesignTokenMapProperties {
  prefix: string;
}
export type DesignTokenMap<T extends Record<string | number, Token> = {}> = DefinePropertiesReturn<
  DesignTokenMapProperties & T,
  DesignTokenMapMethods
>;

export const createDesignTokens = <T extends Record<string | number, Token>>(tokens: T): DesignTokenMap<T> =>
  new Proxy(
    (Object as ObjectConstructor).defineProperties({} as DesignTokenMap<T>, {
      ...Object.entries(tokens).reduce<Record<string, PropertyDescriptor>>((obj, [key, value]) => {
        obj[key] = {
          value,
          enumerable: true,
          configurable: true
        };
        return obj;
      }, {}),
      toJSON: {
        value: function toJSON(theme = {}): string[] {
          return Object.entries(this).reduce((arr, [prop, value]) => {
            if (typeof value !== `function`) {
              const serialize = (): string => {
                if (value instanceof GradientToken) {
                  const flattened = value.css()({ theme });
                  return Array.isArray(flattened) ? flattened.join(``) : String(flattened); //?
                } else if (Array.isArray(value)) {
                  return value.join(`, `);
                }
                return String(value);
              };

              arr.push(`--${(this as DesignTokenMap<T>).prefix}-${prop}: ${serialize()};`);
            }
            return arr;
          }, new Array<string>());
        },
        configurable: true,
        writable: true
      }
    }),
    {
      get: (target, prop): unknown => {
        const original = target[prop as string];
        // Permit internal methods to access the original object
        if (Reflect.ownKeys(target).includes(prop) && typeof original === `function`) {
          return (original as Function).bind(target);
        }
        // Access for all other properties should be proxied, since they should
        // be for the raw token values
        if (Reflect.ownKeys(target).includes(prop) && typeof original !== `function`) {
          return `var(--${target.prefix}-${String(prop)})`;
        }
        return original;
      }
    }
  );
