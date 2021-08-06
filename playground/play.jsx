const { useState, render } = Quark;

const container = document.getElementById("app");
const App = (props) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  return (
    <div className={{
      'bg-gray': value === 'gray'
    }} style={{ padding: '16px' }}>
      <input type="text" value={value} onInput={(e) => {
        setValue(e.target.value);
      }}/>
      <h3>Hello, {props.name}, 输入的内容：</h3>
      <p className={['font-italic', 'margin-10']}>{value}</p>
      <p>Count: <span className="font-bold">{count}</span></p>
      <button onClick={() => {
        setCount(count + 1);
        console.log(`Plus 1 log: ${count}`);
      }}>Plus 1</button>
    </div>
  );
};

render(<App name="David" />, container);
