const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
let counterName = "One";
console.log(root)
root.render(<App/>);

/* Objects */ 
class CounterObj {

    constructor(name,show,total) {
        this.name = name;
        this.show = show;
        this.total = total;
    }
}



/* End Objects*/

//Uncontrolled component (parent)
function App()
{
    const [counterData,setCounterData] = React.useState([
        new CounterObj('A',true,0),
        new CounterObj('B',false,0),
        new CounterObj('C',true,0)
    ])

    const increment = (index) =>{
        const newData = [...counterData];
        newData[index].total = newData[index].total + 1;
        setCounterData(newData);
    }

    const decrement = (index) =>{
        const newData = [...counterData];
        const decrementedCounter = newData[index].total - 1;
        newData[index].total = decrementedCounter >= 0 ?
            decrementedCounter : 0;
        setCounterData(newData);
    }


    return (
    <>
        <h1>Counters</h1>
        <section>
            <CounterList counterData = {counterData} increment = {increment} decrement = {decrement}/>
            <CounterTools>
                <CounterSummary counterData = {counterData}/>
            </CounterTools>  
        </section>
    </>
    )
}

function CounterTools({children}){
    return (
        <>
        {children}
        </>
        
    )
}

function CounterSummary({counterData}){
    const sortedData = [...counterData].sort((a,b)=>{
        return b.total - a.total;
    })
    const summary = sortedData.filter(x=>x.show).map((counter)=>{
            return counter.name + '('+counter.total + ')'
    }).join(', ');
    return (
        <p>
           Summary: {summary}
        </p>
    )
}

function CounterList({counterData,increment,decrement}){
    const updateTitle = useDocumentTitle("Clicks: "+counterData.map((counter)=>{
        return counter.total;
    }).join(', '))
    return (
       <section>
        {counterData.map((counter,index)=>(
            <Counter key = {index} counter={counter} index = {index} increment = {increment} decrement = {decrement}/> 
        ))}
       </section>
    )
}

function useDocumentTitle(title)
{
    return React.useEffect(()=>{
     const originalTitle = document.title;
     document.title = title;
     return () =>{
        document.title = originalTitle;
     }   
    },[title])
}

function useCounter(){
    const [counterVal,setCounterVal] = React.useState({total:0}); 
    const increment = () =>{
        setCounterVal({...counterVal,total: counterVal.total + 1})
    }
    return [
        counterVal,
        increment
    ]
}
//Change the uncontrolled component to controlled component
function Counter({counter,index,increment,decrement})
{

    function handleIncrementClick(){
       increment(index);
    }

    function handleDecrementClick(){
        decrement(index);
     }

    return (
        <dl className = "counter">
            <dt> {counter.name}</dt>
            <dd className = "counter__value">
                <button onClick={handleIncrementClick} className="button">
                    +
                </button>
                {counter.total}
             {
               counter.total > 0 &&
                 <button onClick={handleDecrementClick} className="button">
                     -
                 </button>
             }
               
                </dd>
       </dl>
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