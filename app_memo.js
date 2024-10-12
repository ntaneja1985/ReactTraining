const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
let counterName = "One";
console.log(root);
root.render(<App />);

/* Objects */
class CounterObj {
  constructor(id,name, tab, total) {
    this.id = id;
    this.name = name;
    this.tab = tab;
    this.total = total;
  }
}

/* End Objects*/


//Uncontrolled component (parent)
function App() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj(1,"A", 1, 0),
    new CounterObj(2,"B", 2, 0),
    new CounterObj(3, "C", 1, 0),
  ]);

  const [visibleTab,setVisibleTab] = React.useState(1);

  const increment = (index) => {
    const newData = [...counterData];
    newData[index].total = newData[index].total + 1;
    setCounterData(newData);
  };

  const decrement = (index) => {
    const newData = [...counterData];
    const decrementedCounter = newData[index].total - 1;
    newData[index].total = decrementedCounter >= 0 ? decrementedCounter : 0;
    setCounterData(newData);
  };

  return (
    <>
        <h1>Counters</h1>
        <section>
          <CounterList counterData = {counterData} increment= {increment} decrement = {decrement} />
          <CounterTools counterData = {counterData} visibleTab = {visibleTab} setVisibleTab = {setVisibleTab}  />
        </section>
    </>
  );
}

function CounterTools({counterData,visibleTab,setVisibleTab}) {
  return (
        <CounterSummary counterData = {counterData} visibleTab = {visibleTab} setVisibleTab = {setVisibleTab} />
  );
}

function CounterSummary({counterData,visibleTab,setVisibleTab}) {
  console.log("Rendering Counter Summary")
  // const sortedData = [...counterData].sort((a, b) => {
  //   return b.total - a.total;
  // });
  const filteredSortedData = React.useMemo(()=>{
    console.log("Filtering Data");
    return counterData
    .filter((x) => x.tab === visibleTab);},[visibleTab])

  const setVisibleTab1 = React.useCallback(() =>{
    setVisibleTab(1);
  },[])
  const setVisibleTab2 = React.useCallback(() =>{
    setVisibleTab(2);
  },[])

  return (
    <section>
      <CounterSummaryHeader setVisibleTab1 = {setVisibleTab1} setVisibleTab2 = {setVisibleTab2}/>
      {filteredSortedData.map((counter,index)=>(
        <CounterSummaryDetails key={counter.id} counterName = {counter.name} counterTotal = {counter.total} />
      ))}
    </section>
  );
}

const CounterSummaryHeader = React.memo(function CounterSummaryHeader({setVisibleTab1,setVisibleTab2}){
  console.log("Rendering Counter Summary Header")
  return (
    <header>
        <a href="#" onClick={setVisibleTab1}>Tab 1</a> &nbsp;&nbsp; | &nbsp;&nbsp;
        <a href="#" onClick={setVisibleTab2}>Tab 2</a> 
      </header>
  )
})

const CounterSummaryDetails = React.memo(function CounterSummaryDetails(props)
{
    console.log("Rendering Counter Summary Detail "+props.counterName)
  return (
    <p>
      {props.counterName}({props.counterTotal})
    </p>
  )
});

function CounterList({counterData,increment,decrement}) {
  const updateTitle = useDocumentTitle(
    "Clicks: " +
      counterData
        .map((counter) => {
          return counter.total;
        })
        .join(", ")
  );
  return (
    <section>
      {counterData.map((counter, index) => (
        <Counter key={counter.id} increment={increment} decrement={decrement} counter={counter} index={index} />
      ))}
    </section>
  );
}

function useDocumentTitle(title) {
  return React.useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

function useCounter() {
  const [counterVal, setCounterVal] = React.useState({ total: 0 });
  const increment = () => {
    setCounterVal({ ...counterVal, total: counterVal.total + 1 });
  };
  return [counterVal, increment];
}
//Change the uncontrolled component to controlled component
function Counter({ counter, index,increment,decrement }) {
  const id = React.useId();
  function handleIncrementClick() {
    increment(index);
  }

  function handleDecrementClick() {
    decrement(index);
  }

  return (
    <fieldset className="counter" id={id}>
      <legend className="counter__legend" id={id+"__legend"}> {counter.name}</legend>
      {/* <dd className="counter__value"> */}
      <button onClick={handleIncrementClick} aria-label="Increase Counter" className="button">
        +
      </button>
      <p>{counter.total}</p>
      {counter.total > 0 && (
        <button onClick={handleDecrementClick} className="button">
          -
        </button>
      )}
      {/* </dd> */}
    </fieldset>
  );
}

function Counter2({ name }) {
  return (
    <>
      <article>
        <h2>Counter {name}</h2>
        <p>Clicked 1 time</p>
        <button className="button">Click Me!</button>
      </article>
    </>
  );
}

const numbers = [1, 2, 3, 4];
const reducerFn = (accumulator, currentValue) => {
  const nextAccumulator = accumulator + currentValue;
  return nextAccumulator;
};

const initialValue = 0;
const sum = numbers.reduce(reducerFn, initialValue);

const globalState = {
  NorthSouth: "Green",
  CarWaiting: false,
  WaitTime: 30,
};

function reducer(state, action) {
  switch (action.type) {
    case "Car Waiting": {
      return {
        ...state,
        CarWaiting: true,
        WaitTime: action.payload.WaitTime,
      };
    }
    case "Finish Waiting": {
      return {
        ...state,
        NorthSouth: "Yellow",
      };
    }
    default: {
      return state;
    }
  }
}

const newState1 = reducer(globalState, {
  type: "Car Waiting",
  payload: {
    WaitTime: 5,
  },
});

const newState2 = reducer(newState1, {
  type: "Finish Waiting",
});
