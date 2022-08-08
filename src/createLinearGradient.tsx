import React from "react";
import { useTheme } from "styled-components";
import type { DesignTokenMapProperties } from "./createDesignTokens";

export type ColorNames<T extends object> = Exclude<keyof T, "toJSON">;
type Scale<T extends object> = keyof Omit<T[ColorNames<T>], keyof DesignTokenMapProperties>;
type States = "default" | "hover" | "disabled";

export interface GradientTokenMethods extends PropertyDescriptorMap {
  toSVG: {
    value: (context: { theme: unknown }) => React.ReactNode;
  };
}

export type GradientTokenMap<T extends Record<string, unknown>> = Record<States, GradientToken<T>>;

export class GradientToken<T extends Record<string, unknown>> {
  #prefix: string;
  #color: ColorNames<T>;
  #start: Scale<T>;
  #end: Scale<T>;
  #direction = 0;

  // eslint-disable-next-line accessor-pairs
  set prefix(prefix: string) {
    this.#prefix = prefix;
  }

  constructor(color: ColorNames<T>, start: Scale<T>, end: Scale<T>, direction?: number) {
    this.#color = color;
    this.#start = start;
    this.#end = end;
    if (direction) this.#direction = direction;
  }

  css =
    (): ((props: { theme: any }) => string) =>
    ({ theme }) =>
      `linear-gradient(${this.#direction}deg, ${String(theme.colors[this.#color][this.#start])} 0%, ${String(
        theme.colors[this.#color][this.#end]
      )} 100%)`;

  SVG: React.VFC = () => {
    const theme = useTheme() as any;
    return (
      <linearGradient id={this.#prefix} gradientTransform={`rotate(${this.#direction})`}>
        <stop stopColor={theme.colors[this.#color][this.#start]} offset="0%" />
        <stop stopColor={theme.colors[this.#color][this.#end]} offset="100%" />
      </linearGradient>
    );
  };

  get toJSON(): () => ReturnType<GradientToken<T>["css"]> {
    return () => this.css();
  }

  get toString(): () => string {
    return () => String(this.css());
  }
}
