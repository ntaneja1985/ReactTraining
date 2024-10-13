import { useReducer } from 'react'
import './App.css'
import { CounterObj } from './models/counterObj';
import { counterReducer } from './reducers/counterReducer';
import { tabReducer } from './reducers/tabReducer';
import { CounterContext,CounterDispatchContext,TabContext,TabDispatchContext } from './contexts/context';
import { CounterList } from './components/CounterList';
import { CounterTools } from './components/CounterTools';
function App() {
  const [counterData, counterDispatch] = useReducer(counterReducer, [
      new CounterObj(1,{ longName: 'Counter A', shortName: 'A'}, 1, 0),
      new CounterObj(2, { longName: 'Counter B', shortName: 'B'}, 2, 0),
      new CounterObj(3, { longName: 'Counter C', shortName: 'C'}, 1, 0)
  ]);

  const [visibleTab, tabDispatch] = useReducer(tabReducer, 1);

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

export default App
