const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
let counterName = "One";
console.log(root)
root.render(<App/>);


function App()
{
    // const counterOne = <Counter name={counterName} />
    // const counterTwo = <Counter2 name={counterName} />
    return (
    <section>
        <h1>Counters</h1>
        <section>
            {/* {counterName === "One" ? counterOne : counterTwo} */}
            <Counter name="One"/>
            <Counter name="Two"/>
        </section>
    </section>
    )
}

function Counter(props)
{
    // const clickHandler = (event) =>{
    //     console.log("React handled the event");
    //     console.log(event)
    // }

    // const parentClickHandler = (event) =>{
    //     console.log("Parent was clicked too")
    // }

    // const linkClickHandler = () =>{
        
    //     event.preventDefault();
    //     event.stopPropagation();
    //     console.log("Going to site")
    // }
    // const [state, dispatch] = React.useReducer((state,action)=>{
    //     switch(action.type)
    //     {
    //        case 'Increment': return {...state,clicks:state.clicks+1} 
    //        default:
    //         throw new Error();
    //     }
    // },{clicks:0})
    const [numOfClicks,setNumOfClicks] = React.useState(0);
    let myName = '';
    let setMyName = null;;
    if(numOfClicks < 2)
    {
        [myName,setMyName] = React.useState("Nishant");
    }
   
    const [state,dispatch] = React.useReducer(()=>{},"Taneja");

    return (
    // <article onClick = {parentClickHandler}>
    
        <article>
        <h2>Counter {props.name}</h2>
        <p>You clicked {numOfClicks} times</p>
        <p>{myName} | {state}  </p>
        <button onClick={()=>{
            setNumOfClicks(numOfClicks + 1)
        }} className="button" >
            Click Me!
        </button>
        {/* <p>
            <a href="http://google.com" target = "_blank" onClick = {linkClickHandler}>Google</a>
        </p> */}
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

// function rerender(){
//     console.log("Re-rendering")
//     counterName = "Two"
//     root.render(React.createElement(App));
// }

// rootNode.addEventListener("click",function(event){

//     if(event.target.tagName === "BUTTON")
//     {
//         console.log("Button was clicked")
//     }
//     else {
//         console.log("Didnot click on button")
//     }
// })

const numbers = [1,2,3,4];
const reducerFn = (accumulator,currentValue) => {
    console.log("---Iteration----------")
    console.log("Accumulator: "+accumulator);
    console.log("Current value "+currentValue);

    const nextAccumulator = accumulator + currentValue;
    console.log("Next accumulator: "+nextAccumulator);
    return nextAccumulator;
}

const initialValue = 0;
const sum = numbers.reduce(reducerFn,initialValue);
console.log(sum);

const globalState = {
    NorthSouth: 'Green',
    CarWaiting: false,
    WaitTime: 30
}

function reducer(state, action)
{
    switch (action.type)
    {
        case ('Car Waiting'):{
            return {
                ...state,CarWaiting: true,
                WaitTime: action.payload.WaitTime
            }
        }
        case ('Finish Waiting'):{
            return {
                ...state,
                NorthSouth:'Yellow'
            }
        }
        default:{
            return state;
        }
    }
}

console.log(globalState);
const newState1 = reducer(globalState,{
    type:'Car Waiting',
    payload:{
        WaitTime: 5
    }
})

console.log(newState1)

const newState2 = reducer(newState1,{
    type: 'Finish Waiting',
})

console.log(newState2)