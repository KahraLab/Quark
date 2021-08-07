import { isArray, isString, isObject } from "../utils";

export function updateClass(
  el: Element,
  value: string | string[] | Record<string, boolean> | null
) {
  if (value == null) {
    el.removeAttribute("class");
  } else if (isString(value)) {
    el.className = value;
  } else if (isArray(value)) {
    el.className = value.filter((cls) => Boolean(cls)).join(" ");
  } else if (isObject(value)) {
    el.className = Object.entries(value)
      .map(([className, bool]) => {
        if (bool) return className;
      })
      .join(" ");
  }
}
