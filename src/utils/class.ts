import { isArray } from "../utils";

type ClassNamesValue = string | number | boolean | undefined | null;
type ClassNamesArgument =
  | ClassNamesValue
  | Record<string, unknown>
  | ClassNamesArgument[];

export function classnames(...args: ClassNamesArgument[]) {
  let classes: any[] = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;
    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (isArray(arg)) {
      if (arg.length) {
        const inner = classnames(...arg);
        inner && classes.push(inner);
      }
    } else if (argType === "object") {
      const argObj = arg as Record<string, unknown>;
      if (argObj.toString === Object.prototype.toString) {
        Object.keys(argObj).forEach((key) => {
          if (argObj.hasOwnProperty(key) && argObj[key]) {
            classes.push(key);
          }
        });
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(" ");
}

export function updateClass(el: Element, value: ClassNamesArgument) {
  if (value == null) {
    el.removeAttribute("class");
  } else {
    el.className = isArray(value) ? classnames(...value) : classnames(value);
  }
}
