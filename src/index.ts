import { Attributes, FC, QuarkElement, QuarkNode } from "./typings";

export function createElement<P extends Attributes = {}>(
  type: keyof HTMLElementTagNameMap | FC,
  props?: P,
  ...children: QuarkNode[]
): QuarkElement {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}
export function createTextElement(text: QuarkNode): QuarkElement {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}