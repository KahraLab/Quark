const container = document.getElementById("app");
const updateValue = e => {
  rerender(e.target.value);
}

const rerender = value => {
  const element = (
    <div className={{
      'bg-gray': value === 'gray'
    }} style={{ padding: '16px' }}>
      <input type="text" value={value} onInput={updateValue}/>
      <h3>输入内容查看下方动态变化：</h3>
      <p className={['font-italic', 'margin-10']}>{value}</p>
    </div>
  );
  Quark.render(element, container);
}

rerender('Hello world');