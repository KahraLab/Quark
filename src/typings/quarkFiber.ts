import { ElementProps, FC, Ref } from "./quarkElement";

export type NullableFiber = Fiber | null;
export interface Fiber<P extends ElementProps = any> {
  type: string | FC<P>;
  props: P;
  key?: string;
  ref?: Ref;
  container: Node;
  silbling?: Fiber;
  returns: Fiber;
  child?: Fiber;
  alternate?: Fiber;
  effectTag: string;
}
