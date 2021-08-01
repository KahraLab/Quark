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
  children?: ElementChild[];
}
export interface FragmentProps {
  children: ElementChild[];
}
export const QuarkElementTypeSymbol = Symbol.for('QuarkElement');
export interface QuarkElement<P extends Attributes = any> {
  $$typeof: typeof QuarkElementTypeSymbol;
  type: string | FC;
  props: P;
}
export type ElementChild =
  | string
  | number
  | boolean
  | null
  | undefined
  | QuarkElement
  | ElementChild[];

export interface Fiber<P extends Attributes = any> {
  type: string | FC<P>;
  pendingProps: P;
  ref: Ref;
  lane: number;
  key?: string;
  silbling?: Fiber;
  child?: Fiber;
  returns: Fiber;
}

// FunctionComponent
export interface FC<P extends Attributes = any> {
  (props: P): QuarkElement<P> | null;
  // more properties...
}
