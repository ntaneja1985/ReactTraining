const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));
let counterName = "One";

function App()
{
    const counterOne = <Counter name={counterName} />
    const counterTwo = <Counter2 name={counterName} />
    return (
    <section>
        <h1>Counters</h1>
        <section>
            {counterName === "One" ? counterOne : counterTwo}
        </section>
    </section>
    )
}

function Counter({name})
{
    return (
    <article>
        <h2>Counter {name}</h2>
        <p>You clicked 1 times</p>
        <button className="button">
            Click Me!
        </button>
    </article>
    )
}

function Counter2({name})
{
    return (
        <> 
    <article>
        <h2>Counter {name}</h2>
        <p>Clicked 1 time</p>
        <button className="button">
            Click Me!
        </button>
    </article>
    </>
    )
}

function rerender(){
    console.log("Re-rendering")
    counterName = "Two"
    root.render(React.createElement(App));
}