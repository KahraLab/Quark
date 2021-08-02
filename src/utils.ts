import type { ElementProps } from "./typings";

export const isEvent = (key: string) => key.startsWith("on");
export const isProperty = (key: string) => key !== "children";
export const isNew = (prev: ElementProps, next: ElementProps) => (key: string) =>
  prev[key] !== next[key];
export const isGone = (prev: ElementProps, next: ElementProps) => (key: string) =>
  !Object.keys(next).includes(key);
