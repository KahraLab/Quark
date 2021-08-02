export type Booleanish = boolean | "true" | "false";

export type Key = string | number;
export type RefObject<T> = {
  current: T;
};
export type RefCallback<T> = (instance: T) => void;
export type Ref<T = unknown> = RefObject<T> | RefCallback<T> | null;

export interface PropsType {
  key?: Key;
  ref?: Ref;
  children?: ElementChild[];
  [key: string]: any;
}
export interface FragmentProps {
  children: ElementChild[];
}
export const QuarkElementTypeSymbol = Symbol.for('QuarkElement');
export interface QuarkElement<P extends PropsType = any> {
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

 export type NullableFiber = Fiber | null;
export interface  Fiber<P extends PropsType = any> {
  type: string | FC<P>;
  props: P;
  key?: string;
  ref?: Ref;
  container: Container
  silbling?: Fiber;
  returns: Fiber;
  child?: Fiber;
  alternate?: Fiber;
  effectTag: string;
}

// FunctionComponent
export interface FC<P extends PropsType = any> {
  (props: P): QuarkElement<P> | null;
  // more properties...
}

export type Container = Element | Text | Document | DocumentFragment;

export type RequestIdleCallbackHandle = any;
export type RequestIdleCallbackOptions = {
  timeout: number;
};
export type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};