const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
let counterName = "One";
console.log(root)
root.render(<App/>);

function App()
{
    const [swapCounter,setSwapCounter] = React.useState(false);
    function handleClick(){
        setSwapCounter(!swapCounter);
    }

    let counterOne = null;
    if(!swapCounter)
    {
        counterOne = <Counter name="One"/>
    }
    return (
    <section>
        <h1>Counters</h1>
        <section>
            {/* {counterName === "One" ? counterOne : counterTwo}
            {counterOne}
            {swapCounter ? <Counter name="Two"/>: null} */}
            <Counter name = "One"/>
        </section>
        {/* <button onClick={handleClick} className="button" >
            SwapCounters
        </button> */}
    </section>
    )
}

function Counter(props)
{
    const [numOfClicks,setNumOfClicks] = React.useState({total:0});
       
    React.useEffect(()=>{
        // console.log("In user effect "+ props.name);
        // document.title = "Clicks: " + numOfClicks.total;
        // // return () =>{
        // //     console.log("unmounting +destroying component "+ props.name)
        // // }


     //Stale closure
        const message = `Number of clicks is ${numOfClicks.total}`
        const id = setInterval(()=>{
            console.log(message);
        },2000);
        return () => {
            clearInterval(id)
        }
    },[])
    

    function handleClick(){
        let newNumOfClicks = {...numOfClicks,total:numOfClicks.total + 1};
        setNumOfClicks(newNumOfClicks);
    }

    const   [myName,setMyName] = React.useState("Nishant");
    const [state,dispatch] = React.useReducer(()=>{},"Taneja");

    return (
        <article>
        <h2>Counter {props.name}</h2>
        <p>You clicked {numOfClicks.total} times</p>
        <button onClick={handleClick} className="button" >
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