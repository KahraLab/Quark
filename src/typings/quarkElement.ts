export type Key = string | number;
export type RefObject<T> = {
  current: T;
};
export type RefCallback<T> = (instance: T) => void;
export type Ref<T = unknown> = RefObject<T> | RefCallback<T> | null;

export interface ElementProps {
  key?: Key;
  ref?: Ref;
  children?: ElementCluster;
  [key: string]: any;
}
export interface FragmentProps {
  children: ElementCluster;
}
export const QuarkElementTypeSymbol = Symbol.for('QuarkElement');
export interface QuarkElement<P extends ElementProps = any> {
  $$typeof: typeof QuarkElementTypeSymbol;
  type: string | FC;
  props: P;
}
export type ElementUnit =
  | string
  | number
  | boolean
  | null
  | undefined
  | QuarkElement;
export type ElementCluster = ElementUnit | ElementUnit[];

// FunctionComponent
export interface FC<P extends ElementProps = any> {
  (props: P): ElementCluster;
  // more properties...
}