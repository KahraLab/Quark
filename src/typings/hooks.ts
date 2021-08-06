export type SetStateAction<S> = S | ((prevState: S) => S);
export type Dispatch<A> = (action: A) => void;
export type Reducer<S, A> = (action: A, prevState: S) => S;
export interface DispatchHook<S = any> {
  state: S;
  actions: SetStateAction<S>[];
}
type Hook = DispatchHook;
export interface Hooks {
  list: Hook[];
}
