const container = document.getElementById("app");
const updateValue = e => {
  rerender(e.target.value);
}

const rerender = value => {
  const element = (
    <div>
      <input type="text" value={value} onInput={updateValue}/>
      <h2>Hello {value}</h2>
    </div>
  );
  Quark.render(element, container);
}

rerender("world");