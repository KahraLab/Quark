const { useState, useReducer, render } = Quark;

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

const initItems = ["list-item 1", "list-item 2", "list-item 3"];
function itemsReducer(action, state) {
  switch (action.type) {
    case "push":
      state.push(action.value);
      return state;
    default:
      throw new Error();
  }
}

const container = document.getElementById("app");
const App = (props) => {
  const [value, setValue] = useState("");
  const [state, dispatchState] = useReducer(countReducer, {
    count: 0,
  });
  const [items, dispatchItems] = useReducer(itemsReducer, initItems);

  return (
    <div
      id="quark-test"
      className={{ // 测试 classnames-map
        "bg-gray": value === "gray",
      }}
      style={{ padding: "16px" }}
    >
      <input
        type="text"
        value={value}
        onInput={(e) => {
          setValue(e.target.value);
        }}
      />
      <h3>Hello, 下面同步显示 input 内输入的内容：</h3>
      <p className={["font-italic", "margin-10"]}>"{value || `... 快来呀，${props.name}`}"</p>

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
      <button
        className="margin-10"
        onClick={() => {
          dispatchItems({ type: "push", value: `list-item ${items.length+1}` });
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
    </div>
  );
};

render(<App name="David" />, container);
