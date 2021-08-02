export * from "./class";
export * from "./styie";

import type { ElementProps } from "../typings";

export const isArray = Array.isArray;
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
export const isString = (val: unknown): val is string =>
  typeof val === "string";
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === "symbol";
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

export const isEvent = (key: string) => key.startsWith("on");
export const isProperty = (key: string) => key !== "children";
export const isNew =
  (prev: ElementProps, next: ElementProps) => (key: string) =>
    prev[key] !== next[key];
export const isGone =
  (prev: ElementProps, next: ElementProps) => (key: string) =>
    !Object.keys(next).includes(key);

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as any;
};

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);
const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});
export const capitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
);
