const jsxSample = (
  <div
    class="hello"
    onClick={() => {
      console.log("hello");
    }}
  >
    <p>Hello Quark App!</p>
    <ul id="mylist">
      <li>Task 1</li>
      <li>Task 2</li>
    </ul>
  </div>
);
let App = (props) => {
  return (
    <>
      {jsxSample}
      <div>Name: {props.name}</div>
    </>
  );
};

const appVnode = <App name="quark" />;
console.log("[ appVnode ]", appVnode);
console.log("[ jsxSample ]", jsxSample);
const appCodeBlock = document.getElementById("jsx1");
const appResult = JSON.stringify(appVnode, null, 2);
appCodeBlock.textContent = appResult;

const jsxCodeBlock = document.getElementById("jsx2");
const jsxResult = JSON.stringify(jsxSample, null, 2);
jsxCodeBlock.textContent = jsxResult;
