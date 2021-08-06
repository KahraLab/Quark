import {
  clearDeletions,
  getCurrentRoot,
  setNextUnitOfWork,
  getWorkInProgressFiber,
  setWorkInProgressRoot,
} from "./reconcile";
import {
  Dispatch,
  DispatchHook,
  Fiber,
  Reducer,
  SetStateAction,
} from "./typings";

export let currentHookIndex = 0;
export const resetHookIndex = () => {
  currentHookIndex = 0;
};
function getHook(index: number) {
  const wipFiber = getWorkInProgressFiber();
  return wipFiber?.alternate?.hooks?.list?.[index];
}
function invokeOrReturn<S>(f: SetStateAction<S>, arg: S) {
  return f instanceof Function ? f(arg) : f;
}

export function useReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): [S, Dispatch<SetStateAction<S>>] {
  const oldHook = getHook(currentHookIndex);
  const newHook: DispatchHook<S> = {
    state: oldHook ? oldHook.state : initialState,
    actions: [],
  };

  oldHook?.actions.forEach((action) => {
    newHook.state = reducer(action, newHook.state);
  });

  const dispatch = (action: SetStateAction<S>) => {
    let currentRoot = getCurrentRoot();
    newHook.actions.push(action);
    let wipRoot = setWorkInProgressRoot({
      container: currentRoot?.container || null,
      props: currentRoot?.props || {},
      alternate: currentRoot,
    } as Fiber);
    setNextUnitOfWork(wipRoot);
    clearDeletions();
  };

  let wipFiber = getWorkInProgressFiber();
  wipFiber?.hooks.list.push(newHook);
  currentHookIndex++;
  return [newHook.state, dispatch];
}

export const useState = <S>(initialState: S) =>
  useReducer<S, SetStateAction<S>>(invokeOrReturn, initialState);
