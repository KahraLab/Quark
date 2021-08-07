import { flattenDeep } from "lodash-es";
import {
  ElementProps,
  FC,
  FragmentProps,
  QuarkElement,
  ElementUnit,
  QuarkElementTypeSymbol,
} from "./typings";
import { isArray } from "./utils";

export function createElement<P extends ElementProps = {}>(
  type: keyof HTMLElementTagNameMap | FC,
  props?: P,
  ...children: ElementUnit[]
): QuarkElement {
  return {
    $$typeof: QuarkElementTypeSymbol,
    type,
    props: {
      ...props,
      children: flattenDeep(children).map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}
export function createTextElement(content: ElementUnit): QuarkElement {
  return {
    $$typeof: QuarkElementTypeSymbol,
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: String(content),
      children: [],
    },
  };
}
export function Fragment(props: FragmentProps) {
  return isArray(props.children) ? flattenDeep(props.children) : props.children;
}
