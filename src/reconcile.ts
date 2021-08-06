import { resetHookIndex } from "./hooks";
import {
  Fiber,
  QuarkElement,
  RequestIdleCallbackDeadline,
  ElementProps,
  NullableFiber,
  FC,
  ElementCluster,
  ElementUnit,
} from "./typings";
import {
  updateClass,
  patchStyle,
  isStringifyPrimitive as isCanStringifyPrimitive,
  isArray,
  isBoolean,
} from "./utils";

let nextUnitOfWork: NullableFiber = null;
let wipRoot: NullableFiber = null;
let currentRoot: NullableFiber = null;
let wipFiber: NullableFiber = null;
let deletions: Fiber[];

export const getWorkInProgressRoot = () => wipRoot;
export const getWorkInProgressFiber = () => wipFiber;
export const getCurrentRoot = () => currentRoot;
export const setNextUnitOfWork = (fiber: NullableFiber) => {
  nextUnitOfWork = fiber;
};
export const clearDeletions = () => {
  deletions = [];
};

const isEvent = (key: string) => key.startsWith("on");
const isProperty = (key: string) => key !== "children";
const isNew = (prev: ElementProps, next: ElementProps) => (key: string) =>
  prev[key] !== next[key];
const isGone = (obj: ElementProps) => (key: string) =>
  !Object.keys(obj).includes(key);

export function render(element: QuarkElement, container: Node) {
  wipRoot = {
    container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  } as Fiber;
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function createFiber(properties: Partial<Fiber>) {
  const newFiber = { ...properties } as Fiber;
  if (!newFiber.hooks) {
    newFiber.hooks = {
      list: [],
    };
  }
  return newFiber;
}

function createDOM(fiber: Fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type as keyof HTMLElementTagNameMap);

  updateDOM(dom, {}, fiber.props);
  return dom;
}

function performUnitOfWork(fiber: Fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHost(fiber);
  }

  // try to understand this with Parent-Children-Silblings graph
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.silbling) {
      return nextFiber.silbling;
    }
    nextFiber = nextFiber.returns;
  }

  return null;
}

function updateFunctionComponent(fiber: Fiber) {
  wipFiber = fiber;
  resetHookIndex();
  wipFiber.hooks = {
    list: [],
  };

  const children = (fiber.type as FC)(fiber.props);
  reconcileChildren(fiber, children);
}
function updateHost(fiber: Fiber) {
  if (!fiber.container) {
    fiber.container = createDOM(fiber);
  }

  const children: ElementCluster = fiber.props.children;
  reconcileChildren(fiber, children);
}

function patchNewFiber(
  returns: Fiber,
  element: ElementUnit,
  oldFiber: NullableFiber
): [NullableFiber, NullableFiber] {
  let newFiber: NullableFiber = null;

  let isSameType =
    element &&
    typeof element === "object" &&
    oldFiber &&
    element.type === oldFiber.type;
  if (isSameType) {
    newFiber = createFiber({
      type: oldFiber!.type,
      props: (element as QuarkElement).props,
      container: oldFiber!.container,
      returns,
      alternate: oldFiber,
      effectTag: "UPDATE",
    });
  } else {
    if (element && !isBoolean(element)) {
      const isCanStringifyPrimitiveElement = isCanStringifyPrimitive(element);
      newFiber = createFiber({
        type: isCanStringifyPrimitiveElement
          ? "TEXT_ELEMENT"
          : (element as QuarkElement).type,
        props: isCanStringifyPrimitiveElement
          ? { nodeValue: String(element) }
          : (element as QuarkElement).props,
        returns,
        effectTag: "PLACEMENT",
      });
    }
    if (oldFiber) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
      oldFiber = oldFiber.silbling || null;
    }
  }

  return [newFiber, oldFiber];
}

function reconcileChildren(fiber: Fiber, children: ElementCluster) {
  if (!children) return;

  let oldFiber = fiber.alternate?.child || null;
  let newFiber: NullableFiber;
  if (isArray(children)) {
    let index = 0;
    let prevSilbling: NullableFiber = null;

    while (index < children.length || oldFiber != null) {
      const child = children[index];
      [newFiber, oldFiber] = patchNewFiber(fiber, child, oldFiber);

      if (index === 0) {
        fiber.child = newFiber; // links to the first child
      } else {
        // from second loop
        if (prevSilbling) {
          prevSilbling.silbling = newFiber;
        }
      }
      prevSilbling = newFiber;
      index++;
    }
  } else {
    [newFiber, oldFiber] = patchNewFiber(fiber, children, oldFiber);
    fiber.child = newFiber;
  }
}

function workLoop(deadline: RequestIdleCallbackDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  window.requestIdleCallback(workLoop);
}

function updateDOM(
  container: Node,
  prevProps: ElementProps,
  nextProps: ElementProps
) {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(nextProps))
    .forEach((name) => {
      // @ts-ignore
      container[name] = "";
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const prev = prevProps[name],
        next = nextProps[name];
      if (name === "class" || name === "className") {
        return updateClass(container as Element, next);
      } else if (name === "style") {
        return patchStyle(container as Element, prev, next);
      }

      // @ts-ignore
      container[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      if (prevProps[name]) {
        container.removeEventListener(eventType, prevProps[name]);
      }
      container.addEventListener(eventType, nextProps[name]);
    });
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot!.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber?: NullableFiber) {
  if (!fiber) return;

  let domParentFiber = fiber.returns;
  while (!domParentFiber.container) {
    domParentFiber = domParentFiber.returns;
  }
  const domParent = domParentFiber.container;

  if (fiber.effectTag === "PLACEMENT" && fiber.container) {
    domParent.appendChild(fiber.container);
  } else if (fiber.effectTag === "UPDATE" && fiber.container) {
    updateDOM(fiber.container, fiber.alternate!.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.silbling);
}

function commitDeletion(fiber: Fiber, domParent: Node) {
  if (fiber.container) {
    domParent.removeChild(fiber.container);
  } else {
    fiber.child && commitDeletion(fiber.child, domParent);
  }
}

window.requestIdleCallback(workLoop);
