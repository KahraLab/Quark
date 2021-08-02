import {
  ElementProps,
  FC,
  FragmentProps,
  QuarkElement,
  ElementChild,
  QuarkElementTypeSymbol,
} from "./typings";

export function createElement<P extends ElementProps = {}>(
  type: keyof HTMLElementTagNameMap | FC,
  props?: P,
  ...children: ElementChild[]
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
export function createTextElement(content: ElementChild): QuarkElement {
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
