import type { DesignTokenMap } from "./createDesignTokens";
import type { GradientToken, GradientTokenMap } from "./createLinearGradient";

export type MaybeReadonly<T> = Readonly<T> | T;
export type MaybeArray<T> = T[] | T;

export type Token =
  | MaybeReadonly<MaybeArray<string>>
  | MaybeReadonly<MaybeArray<number>>
  | ReturnType<GradientToken<Record<string, unknown>>["css"]>
  | GradientToken<Record<string, unknown>>;

export type RawTokens = Record<string, Token>;

export type RawTokenMap<T, M extends Record<string, unknown>, V extends RawTokens | GradientTokenMap<M>> = {
  [K in keyof T]: T[K] extends V ? V : RawTokenMap<T[K], M, V>;
};

export interface TokenMapMethods {
  toJSON: {
    value: () => string;
  };
}

export type ExtractPropertyDescriptorValue<T extends object> = T extends Record<infer K, { value: infer V }>
  ? Record<K, V>
  : never;

export type ProxyTheme<T extends object, P extends object> = MappedTokens<T> &
  ExtractPropertyDescriptorValue<P> &
  TokenMapMethods;

export type MappedTokens<T extends object> = {
  [K in keyof T]: T[K] extends object ? MappedTokens<T[K]> : DesignTokenMap & T[K];
};

export type DefinePropertiesReturn<T, M extends PropertyDescriptorMap> = {} extends M
  ? T
  : T & {
      readonly [K in keyof M as M[K] extends { readonly writable: false }
        ? K
        : K extends keyof T
        ? never
        : K]: M[K] extends Readonly<TypedPropertyDescriptor<infer V>> ? V : unknown;
    } & {
      -readonly [K in keyof M as M[K] extends { readonly writable: true }
        ? K
        : K extends keyof T
        ? K
        : never]: M[K] extends Readonly<TypedPropertyDescriptor<infer V>> ? V : unknown;
    };
// Needs https://github.com/microsoft/TypeScript/issues/40562:
// & (asserts target is ({} extends M ? T : T & {
//	readonly [K in keyof M as M[K] extends { readonly writable: false } ? K : (K extends keyof T ? never : K)]:
//		M[K] extends Readonly<TypedPropertyDescriptor<infer V>> ? V : any;
// } & {
//	-readonly [K in keyof M as M[K] extends { readonly writable: true } ? K : (K extends keyof T ? K : never)]:
//		M[K] extends Readonly<TypedPropertyDescriptor<infer V>> ? V : any;
// }))

export type DefinePropertyReturn<
  T,
  P extends PropertyKey,
  V = P extends keyof T ? T[P] : unknown,
  W = P extends keyof T ? true : false
> = T & { readonly [K in P as W extends false ? K : never]: V } & {
  -readonly [K in P as W extends true ? K : never]: V;
};
// Needs https://github.com/microsoft/TypeScript/issues/40562:
// & (asserts target is T &
//	{ readonly [K in P as W extends false ? K : never]: V } &
//	{ -readonly [K in P as W extends true ? K : never]: V });

export interface ObjectConstructor {
  defineProperty<
    T,
    P extends PropertyKey,
    V = P extends keyof T ? T[P] : unknown,
    W = P extends keyof T ? true : false
  >(
    target: T,
    property: P,
    descriptor: TypedPropertyDescriptor<V> & { readonly writable?: W }
  ): DefinePropertyReturn<T, P>;

  defineProperties<T, M extends PropertyDescriptorMap>(
    target: T,
    properties: M & ThisType<T>
  ): DefinePropertiesReturn<T, M>;
}
