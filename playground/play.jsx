const { useState, useReducer, render } = Quark;

function InputTest(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={value}
        onInput={(e) => {
          setValue(e.target.value);
        }}
      />
      <h3>Hello, 下面同步显示 input 内输入的内容：</h3>
      <p
        className={[
          "font-italic",
          "margin-10",
          value.includes("gray") && "bg-gray",
        ]}
      >
        "{value || `... 快来呀，${props.name || "David"}`}"
      </p>
    </>
  );
}

function countReducer(action, state) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
function CountTest(props) {
  const [state, dispatchState] = useReducer(countReducer, {
    count: 0,
  });
  return (
    <>
      <p>
        Count: <span className="font-bold">{state.count}</span>
      </p>
      <div style={{ display: "flex" }}>
        <button
          className="margin-10"
          onClick={() => {
            dispatchState({ type: "increment" });
          }}
        >
          +1
        </button>
        <button
          className="margin-10"
          onClick={() => {
            dispatchState({ type: "decrement" });
          }}
        >
          -1
        </button>
      </div>
    </>
  );
}

const initItems = new Array(10);
for (let i = 0; i < initItems.length; i++) {
  initItems[i] = `item-${i + 1}`;
}
function itemsReducer(action, state) {
  switch (action.type) {
    case "push":
      state.push(action.value);
      return state;
    default:
      throw new Error();
  }
}
function ListTest(props) {
  const [items, dispatchItems] = useReducer(itemsReducer, initItems);
  return (
    <>
      <button
        className="margin-10"
        onClick={() => {
          dispatchItems({ type: "push", value: `item-${items.length + 1}` });
        }}
      >
        Add list item
      </button>
      <ul>
        {items.map((val, i) => {
          return (
            <li key={`${i}-${val}`}>
              No.{i}: {val}
            </li>
          );
        })}
      </ul>
    </>
  );
}

const container = document.getElementById("app");
function App(props) {
  return (
    <div id="quark-test" style={{ padding: "16px" }}>
      <InputTest />
      <CountTest />
      <ListTest />
    </div>
  );
}

render(<App name="David" />, container);
