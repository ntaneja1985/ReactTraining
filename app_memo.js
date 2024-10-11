const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
let counterName = "One";
console.log(root);
root.render(<App />);

/* Objects */
class CounterObj {
  constructor(id,name, show, total) {
    this.id = id;
    this.name = name;
    this.show = show;
    this.total = total;
  }
}

/* End Objects*/

const CounterContext = React.createContext(3);

//Uncontrolled component (parent)
function App() {
  const [counterData, setCounterData] = React.useState([
    new CounterObj(1,"A", true, 0),
    new CounterObj(2,"B", true, 0),
    new CounterObj(3, "C", true, 0),
  ]);

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
  const contextData = [counterData, increment, decrement];
  return (
    <>
      <CounterContext.Provider value={contextData}>
        <h1>Counters</h1>
        <section>
          <CounterList />
          <CounterTools />
        </section>
      </CounterContext.Provider>
    </>
  );
}

function CounterTools() {
  return (
        <CounterSummary />
  );
}

function CounterSummary() {
  const [contextData, increment, decrement] = React.useContext(CounterContext);
  const sortedData = [...contextData].sort((a, b) => {
    return b.total - a.total;
  });
  const filteredSortedData = sortedData
    .filter((x) => x.show);
  return (
    <section>
      Summary: {filteredSortedData.map((counter,index)=>(
        <CounterSummaryDetails key={counter.id} counterName = {counter.name} counterTotal = {counter.total} />
      ))}
    </section>
  );
}

const CounterSummaryDetails = React.memo(function CounterSummaryDetails(props)
{
    console.log("Rendering Counter Summary Detail "+props.counterName)
  return (
    <p>
      {props.counterName}({props.counterTotal})
    </p>
  )
});

function CounterList() {
  const [contextData, increment, decrement] = React.useContext(CounterContext);
  const updateTitle = useDocumentTitle(
    "Clicks: " +
      contextData
        .map((counter) => {
          return counter.total;
        })
        .join(", ")
  );
  return (
    <section>
      {contextData.map((counter, index) => (
        <Counter key={counter.id} counter={counter} index={index} />
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
function Counter({ counter, index }) {
  const [contextData, increment, decrement] = React.useContext(CounterContext);
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
