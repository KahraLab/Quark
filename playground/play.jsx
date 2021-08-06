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

const container = document.getElementById("app");
const App = (props) => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useReducer(countReducer, {
    count: 0,
  });

  return (
    <div
      id="quark-test"
      className={{
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
      <h3>Hello, {props.name}, 输入的内容：</h3>
      <p className={["font-italic", "margin-10"]}>[ {value || "..."} ]</p>

      <p>
        Count: <span className="font-bold">{state.count}</span>
      </p>
      <div style={{ display: "flex" }}>
        <button
          className="margin-10"
          onClick={() => {
            dispatch({ type: "increment" });
          }}
        >
          +1
        </button>
        <button
          className="margin-10"
          onClick={() => {
            dispatch({ type: "decrement" });
          }}
        >
          -1
        </button>
      </div>
    </div>
  );
};

render(<App name="David" />, container);
