const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
console.log(root)
root.render(<App/>);
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
    const clickHandler = (event) =>{
        console.log("React handled the event");
        console.log(event)
    }

    const parentClickHandler = (event) =>{
        console.log("Parent was clicked too")
    }

    const linkClickHandler = () =>{
        
        event.preventDefault();
        event.stopPropagation();
        console.log("Going to site")
    }
    return (
    <article onClick = {parentClickHandler}>
        <h2>Counter {name}</h2>
        <p>You clicked 1 times</p>
        <button className="button" onClick = {clickHandler}>
            Click Me!
        </button>
        <p>
            <a href="http://google.com" target = "_blank" onClick = {linkClickHandler}>Google</a>
        </p>
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

// rootNode.addEventListener("click",function(event){

//     if(event.target.tagName === "BUTTON")
//     {
//         console.log("Button was clicked")
//     }
//     else {
//         console.log("Didnot click on button")
//     }
// })