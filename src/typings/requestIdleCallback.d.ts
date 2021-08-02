import {
  RequestIdleCallbackDeadline,
  RequestIdleCallbackHandle,
  RequestIdleCallbackOptions,
} from "./index";

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

export /** hack for "declare global" */ {};
