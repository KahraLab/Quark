export type RequestIdleCallbackHandle = any;
export type RequestIdleCallbackOptions = {
  timeout: number;
};
export type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  type NewType = RequestIdleCallbackHandle;

  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => NewType;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}
