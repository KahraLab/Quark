import type {
  Fiber,
  QuarkElement,
  RequestIdleCallbackDeadline,
  ElementProps,
  NullableFiber,
} from "./typings";
import { isEvent, isProperty, isNew, isGone } from "./utils";
import { updateClass, patchStyle } from "./utils";

let workInProgress: NullableFiber = null;
let rootFiber: NullableFiber = null;
let currentRoot: NullableFiber = null;
let deletions: Fiber[];

export function render(element: QuarkElement, container: Node) {
  rootFiber = {
    container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  } as Fiber;
  deletions = [];
  workInProgress = rootFiber;
}

function updateDOM(
  container: Node,
  prevProps: ElementProps,
  nextProps: ElementProps
) {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
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
  commitWork(rootFiber!.child);
  currentRoot = rootFiber;
  rootFiber = null;
}

function commitWork(fiber?: Fiber) {
  if (!fiber) return;
  const domParent = fiber.returns.container;
  if (fiber.effectTag === "PLACEMENT" && fiber.container) {
    domParent.appendChild(fiber.container);
  } else if (fiber.effectTag === "UPDATE" && fiber.container) {
    updateDOM(fiber.container, fiber.alternate!.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.container);
  }

  commitWork(fiber.child);
  commitWork(fiber.silbling);
}

function createDOM(fiber: Fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type as keyof HTMLElementTagNameMap);

  updateDOM(dom, {}, fiber.props);
  return dom;
}

function performWork(workInProgress: Fiber) {
  if (!workInProgress.container) {
    workInProgress.container = createDOM(workInProgress);
  }

  const elements: QuarkElement[] = workInProgress.props.children;
  reconcileChildren(workInProgress, elements);

  // try to understand this with Parent-Children-Silblings graph
  if (workInProgress.child) {
    return workInProgress.child;
  }
  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.silbling) {
      return nextFiber.silbling;
    }
    nextFiber = nextFiber.returns;
  }

  return null;
}

function reconcileChildren(wip: Fiber, elements: QuarkElement[]) {
  let index = 0;
  let oldFiber = wip.alternate?.child || null;
  let prevSilbling: NullableFiber = null;

  while (index < elements.length || !!oldFiber) {
    const element = elements[index];
    let newFiber: NullableFiber = null;

    const isSameType = element && oldFiber && element.type === oldFiber.type;

    if (isSameType) {
      newFiber = {
        type: oldFiber!.type,
        props: element.props,
        container: oldFiber!.container,
        returns: wip,
        alternate: oldFiber!,
        effectTag: "UPDATE",
      };
    }
    if (element && !isSameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        // @ts-ignore
        container: null,
        returns: wip,
        // @ts-ignore
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !isSameType) {
      (oldFiber.effectTag = "DELETION"), deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.silbling || null;
    }

    if (index === 0) {
      wip.child = newFiber!; // links to the first child
    } else {
      prevSilbling!.silbling = newFiber!;
    }
    prevSilbling = newFiber;
    index++;
  }
}

function workLoop(deadline: RequestIdleCallbackDeadline) {
  let shouldYield = false;
  while (workInProgress && !shouldYield) {
    workInProgress = performWork(workInProgress);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!workInProgress && rootFiber) {
    commitRoot();
  }

  window.requestIdleCallback(workLoop);
}

window.requestIdleCallback(workLoop);
