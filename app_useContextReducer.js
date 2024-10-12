const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
//root.render(React.createElement(App));
let counterName = "One";
console.log(root);
root.render(<App />);

/* Objects */
class CounterObj {
  constructor(id, name, tab, total) {
    this.id = id;
    this.name = name;
    this.tab = tab;
    this.total = total;
  }
}

/* End Objects*/

const CounterContext = React.createContext(null);
const CounterDispatchContext = React.createContext(null);
const TabContext = React.createContext(null);
const TabDispatchContext = React.createContext(null);

function counterReducer(counterData, action) {
  switch (action.type) {
    case "increment": {
      return counterData.map((counter) => {
        if (counter.id === action.id) {
          return { ...counter, total: counter.total + 1 };
        } else {
          return counter;
        }
      });
    }
    case "decrement": {
      return counterData.map((counter) => {
        if (counter.id === action.id) {
          return {
            ...counter,
            total: counter.total >= 0 ? counter.total - 1 : 0,
          };
        } else {
          return counter;
        }
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function tabReducer(visibleTab, action) {
  switch (action.type) {
    case "change-tab": {
      if (action.tab === visibleTab) {
        return visibleTab;
      } else {
        return action.tab;
      }
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
//Uncontrolled component (parent)
function App() {
  const [counterData, counterDispatch] = React.useReducer(counterReducer, [
    new CounterObj(1, "A", 1, 0),
    new CounterObj(2, "B", 2, 0),
    new CounterObj(3, "C", 1, 0),
  ]);

  const [visibleTab, tabDispatch] = React.useReducer(tabReducer, 1);

  return (
    <>
      <CounterContext.Provider value={counterData}>
        <CounterDispatchContext.Provider value={counterDispatch}>
          <TabContext.Provider value={visibleTab}>
            <TabDispatchContext.Provider value={tabDispatch}>
              <h1>Counters</h1>
              <section>
                <CounterList />
                <CounterTools />
              </section>
            </TabDispatchContext.Provider>
          </TabContext.Provider>
        </CounterDispatchContext.Provider>
      </CounterContext.Provider>
    </>
  );
}

function CounterTools() {
  return (
    <CounterSummary
    />
  );
}

function CounterSummary() {
  const counterData = React.useContext(CounterContext);
  const visibleTab = React.useContext(TabContext);
  const tabDispatch = React.useContext(TabDispatchContext);

  console.log("Rendering Counter Summary");
  const filteredSortedData = React.useMemo(() => {
    console.log("Filtering Data");
    return counterData.filter((x) => x.tab === visibleTab);
  }, [counterData,visibleTab]);

  const setVisibleTab1 = React.useCallback((event) => {
    tabDispatch({type:'change-tab', tab: 1})
    event.preventDefault();
  }, []);
  const setVisibleTab2 = React.useCallback((event) => {
    tabDispatch({type:'change-tab', tab: 2})
    event.preventDefault();
  }, []);

  return (
    <section>
      <CounterSummaryHeader
        setVisibleTab1={setVisibleTab1}
        setVisibleTab2={setVisibleTab2}
      />
      {filteredSortedData.map((counter) => (
        <CounterSummaryDetails
          key={counter.id}
          counterName={counter.name}
          counterTotal={counter.total}
        />
      ))}
    </section>
  );
}

const CounterSummaryHeader = React.memo(function CounterSummaryHeader({
  setVisibleTab1,
  setVisibleTab2,
}) {

  return (
    <header>
      <a href="#" onClick={setVisibleTab1}>
        Tab 1
      </a>{" "}
      &nbsp;&nbsp; | &nbsp;&nbsp;
      <a href="#" onClick={setVisibleTab2}>
        Tab 2
      </a>
    </header>
  );
});

const CounterSummaryDetails = React.memo(function CounterSummaryDetails(props) {
  return (
    <p>
      {props.counterName}({props.counterTotal})
    </p>
  );
});

function CounterList() {
  const counterData = React.useContext(CounterContext);

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
      {counterData.map((counter) => (
        <Counter
          key={counter.id}
          counter={counter}
        />
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
function Counter({ counter}) {
  const counterDispatch = React.useContext(CounterDispatchContext);
  const id = React.useId();
  function handleIncrementClick(event) {
    counterDispatch({type:'increment',id:counter.id})
    event.preventDefault();
  }

  function handleDecrementClick(event) {
    counterDispatch({type:'decrement',id:counter.id});
    event.preventDefault();
  }

  return (
    <fieldset className="counter" id={id}>
      <legend className="counter__legend" id={id + "__legend"}>
        {" "}
        {counter.name}
      </legend>
      {/* <dd className="counter__value"> */}
      <button
        onClick={handleIncrementClick}
        aria-label="Increase Counter"
        className="button"
      >
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
