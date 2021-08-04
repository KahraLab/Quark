export * from "./class";
export * from "./styie";

export const isArray = Array.isArray;
export const isNumber = (val: unknown): val is number =>
  typeof val === "number" || typeof val === "bigint";
export const isNull = (val: unknown): val is null => val === null;
export const isUndefined = (val: unknown): val is undefined =>
  typeof val === "undefined";
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
export const isString = (val: unknown): val is string =>
  typeof val === "string";
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === "symbol";
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";
export const isStringifyPrimitive = (val: unknown): boolean =>
  isNumber(val) || isString(val);
export const isBoolean = (val: unknown): val is boolean =>
  typeof val === "boolean";

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
