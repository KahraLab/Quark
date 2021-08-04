import { ElementProps, FC, QuarkElement, Ref } from "./quarkElement";

export type NullableFiber = Fiber | null;
export interface Fiber<P extends ElementProps = any> {
  type: string | FC<P>;
  props: P;
  key?: string;
  ref?: Ref;
  container: Node;
  silbling?: NullableFiber;
  returns: Fiber;
  child?: NullableFiber;
  alternate?: NullableFiber;
  effectTag: string;
}
