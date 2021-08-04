import {
  ElementProps,
  FC,
  FragmentProps,
  QuarkElement,
  ElementUnit,
  QuarkElementTypeSymbol,
} from "./typings";

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
      children: children.map((child) =>
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
      children: []
    },
  };
}
export function Fragment(props: FragmentProps) {
  return props.children;
}
