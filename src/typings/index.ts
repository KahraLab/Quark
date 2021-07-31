export type Booleanish = boolean | "true" | "false";

export type Key = string | number;
export type RefObject<T> = {
  current: T;
};
export type RefCallback<T> = (instance: T) => void;
export type Ref<T = unknown> = RefObject<T> | RefCallback<T> | null;

export interface Attributes {
  key?: Key;
  ref?: Ref;
  children?: QuarkNode[];
}
export interface FragmentProps {
  children: QuarkNode[];
}
export interface QuarkElement<P extends Attributes = any> {
  type: string | FC;
  props: P;
}
export type QuarkNode =
  | string
  | number
  | boolean
  | null
  | undefined
  | QuarkElement
  | QuarkNode[];

// FunctionComponent
export interface FC<P extends Attributes = any> {
  (props: P): QuarkElement<P> | null;
  // more properties...
}
