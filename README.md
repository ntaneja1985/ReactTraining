<# ReactTraining
React Training by Tony Alicea

React source code is open source:
https://github.com/facebook/react

React is other people's javascript code. Its not a blackbox.
DOM and Declarative Programming
```html
<section>
<ul>
<li>Section 1</li>
<li>Section 2</li>
<li>Section 3</li>
</ul>
</section>
```

All of these elements form part of a tree.
When the browser reads in the text file(html file), it renders objects in computer memory in form of a tree. These objects have references to one another. It is a tree of objects. This tree models what was there in the document. This is known as the document object model (DOM).

DOM: Collection of objects in the computer's memory that represent the HTML elements that define a webpage. It provides the ability to analyze and change the document being presented to the user.

DOM: (inverted) tree data structure
Root is at the top
Root --> Parent -->Child

HTML is a text file which is read in -->
Browser converts it into the DOM -->
Collection of objects in computer memory -->
Browser takes these collection of objects and paints(renders) the web page to the user screen.

DOM Manipulation
We can change the DOM tree
When the DOM tree is changed, the browser re-renders the webpage.
Browser APIs are the endpoints through which our user code can talk to the browser code

Lets say we want to append a child to an element in HTML. It is not a standard javascript function. It is provided by the browser that we can call from our javascript code. It causes our DOM to re-render.

We have 2 types of engines:
1. Javascript Engine (C++)
2. Rendering Engine (C++)

Both engines sit inside the browser. Using Javascript code we can provide them with instructions to manipulate the DOM via Browser APIs

When we write <script src="./app.js"/> inside the body tag, it ensures that DOM elements have already been created when this javascript is run.


## Building dynamic web applications means manipulating the DOM.

Manipulating the DOM is an expensive task.
We need to minimize the work at manipulating the DOM.
     
## IMPERATIVE VS DECLARATIVE PROGRAMMING

1. IMPERATIVE PROGRAMMING: Style of programming in which we describe how a program should do its task:
For e.g how a dog should tie its shoes

2. DECLARATIVE PROGRAMMING: Style of programming in which we declare what we want the program to accomplish without describing how.

**DECLARATIVE PROGRAMMING SYSTEM IS BUILT ON TOP OF IMPERATIVE PROGRAMMING.**

## We rely on programming done by other developers

In simple words, **React Code is imperative programming** i.e it has the code with instructions as to how to update the DOM.

Declarative programming is what we as developers, do. We just need to write code for our business logic and react code takes care of providing a set of instructions to the browsers as to how to render it. 

It makes our life easier so that we can focus on what our application should do rather than bothering about how it will do it.

# React Elements
- Recursion: A function that calls itself. Can cause stackoverflow exceptions.
- Recursion is a common way of traversing through a tree data structure. 
- While traversing we move from element to element, that is from parent to child to sibling etc.
- In React we are dealing with trees, so we traverse down the tree.
- React avoids recursion as much as it can
 
  ```javascript
    function a()
    {
        if(...)
        {
            a();
        } else
        {
            return;
        }
    }

  ```
  ## POJO(Plain old javascript objects)
  - Simple collection of name/value pairs
  - A virtual DOM is also like a POJO
  - It has various elements that are rendered on a page expressed as a POJO object
  - Then we can have something like a render function that traverses the virtual DOM object and updates the real DOM. 
  - There could be efficient ways of doing this as well. We dont necessarily have to go through each and every element inside a virtual DOM and neither do we need to recreate the page again from scratch. 
  - Example of react virtual DOM is given below. Also find a function that recursively goes through all the elements of the virtual DOM(POJO object) and renders it on a page
  - Here the markup object represents the virtual DOM. This is a tree like object and looks like declarative code
  - addElements() is a method that takes the input of the markup object and the parentDOM object and renders it on the page
  

  ```javascript
    // Example of a virtual DOM
    // Looks like declarative code
    // Tree like structure
    let markup = {
        type: 'article',
    children: [
        {
            type: 'h2',
            children: [
                {
                    type: 'text',
                    value: 'Counter'
                }        
            ]
        },
        {
            type: 'h3',
            children: [
                {
                    type: 'text',
                    value: 'This works'
                }        
            ]
        },
        {
            type: 'p',
            children: [
                {
                    type: 'text',
                    value: 'Counter'
                },
                {
                    type: 'strong',
                    children: [
                        {
                            type: 'em',
                            children: [
                                {
                                    type: 'text',
                                    value: '1'
                                }        
                            ]
                        }        
                    ]
                },
                {
                    type: 'text',
                    value: 'times'
                }      
            ]
        },
        {
            type: 'button',
            children: [
                {
                    type: 'text',
                    value: 'Click me'
                }
            ]
        }
    ]
    }

    console.log(markup)

    // Need imperative code to make declarative code work
    // Real DOM Object
    const main = document.getElementById("app");
    console.log(main)

    // method to add the elements to the real DOM from the POJO object
    // this is how we add elements from virtual DOM to the main DOM
    function addElements(pojoElement, parentDOMNode)
    {
    let newDOMNode = pojoElement.type === 'text' ? document.createTextNode(pojoElement.value)
                    : document.createElement(pojoElement.type);
    if(pojoElement.children)
    {
        pojoElement.children.forEach((child) => {
            addElements(child,newDOMNode)
        });
    }
    console.log(parentDOMNode);
    parentDOMNode.appendChild(newDOMNode);
    }

    addElements(markup,main);

  ```
  
  ## Creating React Elements
 - We need to understand the POJO objects that React makes
 - A tree of React elements is a tree of simple objects with defined types like function or strings.
 - If it is a function, it calls that function
 - React.createElement() is declarative but React made it work imperatively
 - It creates a virtual DOM first and then it updates the real DOM.
  
  ## React Element Tree
  - Data structure of POJO objects
  - DOM Objects are itself complex objects used by browser to render the webpage.
  - React Element Tree are simple objects used by React's code that represent the DOM tree. 
  - React Element tree is a fake tree(virtual) and is simplistic.
  - It just gives an idea of what real tree should look like
  - DOM tree is a real tree that users interact with
  
  - To create a React Element tree do this:

  ```javascript
    const rootNode = document.getElementById("app");
    const root = ReactDOM.createRoot(rootNode);
    root.render(React.createElement(App));

    function App()
    {
            // console.log("Called App")
        return (
            //  React.createElement("button",null,"Click me")
            React.createElement("article", null,
            React.createElement("h2",null,"Counter"),
            React.createElement("p",null,"You clicked 1 time(s)"),
            React.createElement("button",null,"Click Me"))

            )
    }
  ```

### DOM Element References
- document.getElementById() helps to get the DOM Object
- gets the location of the object in the computer's memory

### React Elements and DOM Elements(From POJOs to the browser)
- Virtual DOM vs Real DOM
- Tree of React Elements(what we want to DOM look like) vs Tree of Real Elements(which user sees on his screen right now)
- Imperative programming needs to update the Real DOM from the Virtual DOM
- React creates a React Element Tree
- React code runs after the Javascript code has run. It works asynchronously
- It does so so that it doesnt block the code or doesnt block the user

```javascript
// before React does it work
// React works asynchronously
// React waits for Javascript engine to be available
// React exhibits this behaviour on purpose, so that it doesnt block the user or doesnt block the code
// It waits for the rest of our javascript code to be run before doing its work
let articleElements = document.getElementsByTagName("article");
let articleElement = document.getElementsByTagName("article").item(0);
console.log(articleElements);
console.log(articleElement);

//after React does it work
setTimeout(()=>{
    let articleElements = document.getElementsByTagName("article");
    let articleElement = document.getElementsByTagName("article").item(0);
    console.log(articleElements);
    console.log(articleElement);
},2000)
```

# React DOM Updates
- Declarative coding stands on shoulders of imperative coding
- React has imperative code which allows us to write declarative code
- React DOM file has the imperative code to render the element in the browser
- So when we declaratively create a React Element using React.createElement(), the react library transforms that into a set of instructions(imperative code) for the browser
- We know React Virtual DOM is a POJO object. So does react create all the elements from the virtual DOM into the real DOM one by one?
- The answer is NO. It first builds the object tree internally and renders it one time. The idea is to minimize the DOM refreshes as not only it is an expensive operation but it gives poor user experience. 
- So if we have an article tag with h2, p, button tags inside it, react first builds the article tag with all its child elements inside it inside the virtual DOM
- Then it updates the real DOM only once.
  
# Components
- It is React's job to update the DOM
- We tell React how to update the DOM
- Component: In react, a function component is a function that returns a React element(which may contain other React Elements). It is intended to be called by React
- Components are reusable, but we dont usually reuse everyone.
- In react everything is a component
- Everything is a piece of what we want the React Element Tree to look like
- Components promote reusability and the DRY principle
- React components are implemented through functions
- Each function is converted into a react element object
- React goes through the React Element tree and calls each function for the Component. It checks for the type of the elements and acts accordingly
- If the element is a type of function then React will call it
- React chooses to define components as functions
- These functions return React elements
- React call functions and functions return react elements which may have children and then react then does the imperative work to match our declarative statements of what the DOM should look like.

## Pure Functions
- A pure function is a function that for the same inputs gives the same output and causes no side effects.

```javascript
let counter = {name: 'Counter'};
let counterValue = 1;


//Pure function
//Has no side effects
function pureCounter(ctr,value)
{
    return `${ctr.name} ${value}`;
}

console.log(pureCounter(counter,counterValue));
console.log(pureCounter(counter,counterValue+1));
console.log(pureCounter(counter,counterValue));

//Here we have mutated the ctr object
//ctr object is passed by reference so it results in a different value each time
//Here we are updating the global value rather than the value passed to me
//Here for the same set of inputs we get different outputs
//Impure functions are buggy, difficult to maintain code
//React has features to ensure our function components are pure
function impureCounter(ctr,value)
{
    ctr.name = ctr.name + ' Nishant';
    counterValue = counterValue + 1;
    return `${ctr.name} ${value}`;
}
console.log('----')
console.log(impureCounter(counter,counterValue));
console.log(impureCounter(counter,counterValue+1));
console.log(impureCounter(counter,counterValue));
console.log(counter)
```

# Props
- Props are function arguments
- When react goes through the react element tree and it sees a function component, it calls that function
- Functions can be passed arguments
- Props are arguments that are passed to these functions
- Same function component can be used to generate different sub-trees
- Makes components flexible and reusable
- props are immutable
- Cannot be changed
- props is used with Object.isFrozen(props) inside react
- The reason why props are immutable because it create pure functions
- ***Remember impure functions lead to buggy code and cause side effects, react fixes this by forcing us to have immutable props and thereby creating pure functions***
- Helps react to behave in predictable way
- Please note that destructuring the props is useful, but then we can change the individual properties inside it, so then it can make our functions impure and cause side-effects
  
  ```javascript
    function Counter({name})
    {
    //console.log(props)
    //console.log("Called App")
    return (
        //React.createElement("button",null,"Click me")
            React.createElement("article", null,
            React.createElement("h2",null,"Counter ",name),
            React.createElement("p",null,"You clicked 1 time(s)"),
            React.createElement("button",null,"Click Me"))
           )
    }
  ```
# Template Logic
- In real applications we need logic to make our applications dynamic and response to user inputs

```javascript
let counterName = "One"
root.render(React.createElement(App));
//console.log(React);

function App()
{
    return React.createElement("section", null, 
        React.createElement("h1", null, "Counters"),
        React.createElement("section",null,
           counterName === "One" ? React.createElement(Counter,{name:counterName})
                                 : React.createElement(Counter2,{name:counterName})
            // // add another counter
            // React.createElement(Counter,{name:"Two"})
        )
    );
}


function updateFn()
{
    console.log("Updating..");
    counterName = "Two"
    //Force react to re-render
    root.render(React.createElement(App));
}
```
- Please note when we click on updateFn() and force the DOM to re-render, it did do append child to container, it actually did only appending child
- When we force the DOM to re-render, react compares the Real DOM to the Virtual DOM and only replaces those elements on the Real DOM which have changed as per the Virtual DOM. This is very efficient.
- React has the ability to look at the existing DOM and make intelligent decisions as to how to update it.
- It compares the 2 trees and makes the change
- React element tree is very lightweight...its just POJOs
- This comparison is not a very expensive operation

# Element Properties and DOM
- For now we have been creating React Elements using the following code:
  ```javascript
    React.createElement("h2",null,"Counter"),
  ```
  - What we are passing as null above, is actually the set of attributes we can define for the HTML element h2
  - We can pass name attribute, classname attribute or any other attribute applicable to h2 element


    ```javascript
     React.createElement("button",{className:"button",name:"NishantButton"},"Click Me"))
    ```
    - React.createElement() is a function and we are passing an object as props to it. 
    - We can specify the attributes within that props object and React will automatically update the real DOM with the attributes that we have specified inside that object for that particular element
  

  # JSX

 ***Markup and Tree Creation shorthand***
 - In react we create lot of tree data structures
 - In react the challenge was to how to write these trees easily
 - But we also want to include some logic and javascript code while creating trees
 - Transformation and Transpilation: Transforming (changing) the text of code written in one syntax and converting it to a different syntax that does the same thing.
 - Sometimes a "transpiler" is referred to as "transformer"
 - Makes the life of developers easier
 - Markup is not part of javascript syntax
 - Transpilation allows us to write the code in an easier way
  
# React Elements and JSX
- Just a shortcut for creating and writing POJOs
- JSX is an XML like syntax extension to ECMAScript without any defined semantics.
- What does semantics mean? For e.g HTML elements need to have certain meanings(semantics). This means "ol" stands for ordered list, "a" stands for anchor tag and so forth
- But JSX doesnot have any of these defined semantics. We can create our own semantics(or our own tags) like "specialTagByNishant"
- JSX is not HTML inside javascript. It is a markup language with no defined semantics.
- JSX is a generic way of writing tree data structures as part of a javascript file.
- JSX is not even meant to run inside a browser. It is to be used by various transpilers to transform its tokens(or tags) into standard ECMAScript(or Javascript)
- JSX is just shorthand to do our job faster
- Writing trees is most easiest using markup
```javascript
// Using JSX to express UI components
var dropdown  = <Dropdown>
    A dropdown list
    <Menu>
      <MenuItem>Do Something</MenuItem>
      <MenuItem>Do Something Fun!</MenuItem>
      <MenuItem>Do Something Else</MenuItem>
    </Menu>
  </Dropdown>;

  render(dropdown);
```
- Good thing is JSX is not a string but markup language
- JSX stands for Javascript syntax extension or Javascript XML

```javascript
const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));

function App()
{
    return (
    <section>
        <h1>Counters</h1>
        <section>
            <Counter/>
        </section>
    </section>
    )
}

function Counter()
{
    return (
    <article>
        <h2>Counter</h2>
        <p>You clicked 1 times</p>
        <button className="button">
            Click Me!
        </button>
    </article>
    )
}
```
- Here, above, we have removed React.createElement() and written JSX.
- As we can see it is simple to write and understand.
- But browser will not understand it directly.
- It will first transpile it to Javascript using Babel compiler and then only render it
- Careful authored HTML is easier to read and maintain
- Please note that div is not a container
- React functions return only a single element
- div element has no special meaning. It only represents its children.
- div is an element of the last resort.
- Deeper our DOM tree, slower is the performance of our page
- Dont add too many layers to the DOM tree
- Instead of div use React fragments like <></>
- React fragment is not added to the real DOM

# Fiber and Reconciliation

### Root Creation and Render
- All code in React begins with the definition of a root node
  ```javascript
    const root = ReactDOM.createRoot(rootNode);
  ```
- This initializes a tree data structure which will have children appended to it
- Linked List is a simple data structure that creates a line of items that are linked to each other. It has a pointer to the next element. We have doubly linked list also. It is very light of memory. It is easy to traverse a linked list
- In React we have Fiber Nodes and Fiber Trees
***In addition to DOM Element Tree and React Element Tree, we have the Fiber Tree***
- Fiber Tree are simple objects used by React Tree to store information and determine what work needs to be done
- React Element Tree is disposed of and re-rendered but React Fiber Tree is not destroyed or recreated, rather it is updated
- React Fiber Tree is used to store state
- React Fiber Tree can be used as a middleman between DOM Tree and React Tree. It can be used to determine what needs to be rendered on the actual DOM tree and best way to make them.
- Fiber Tree uses Linked Lists and is very lightweight
- Reason why we use 3 trees is to make React as lightweight as possible.
- Fiber Tree is essentially a copy of the React Element tree at a particular point of time
- In react fiber tree we have updateContainer() method
- Basically this tree structure is defined using LinkedLists
- All features of React are built on top of Fiber Tree
- For all of our DOM elements, React adds a reference to the Fiber Nodes
- Fiber Nodes also have references to the DOM
- Tree Reconciliation and Tree Edit Distance Problem: Reconciliation means comparing 2 items to find difference between them
- We compare 2 trees or portion of trees and finding the steps to make them match.
- Tree Edit Distance Problem: What is the algorithm to find the smallest number of steps to change one tree to match another?
- Finding the number of steps is important as we want to minimize the number of steps to convert React Element Tree to DOM Tree.
- Methodology(Algorithm) to find minimum of steps should also be very efficient.
- We only define our React Element tree with JSX, React does all the above work.
- Fiber tree matches the current state of the DOM Tree, React Element tree tells us what the tree should look like(declarative)
- Think of Fiber tree as an area where we can do rough work. It is like a small model of the DOM tree where we can try our changes before we make changes to real DOM tree.
- When React Element Tree changes, the portion of tree that has changed is first rendered on the Fiber Tree
- When the React Element Tree changes, React attaches the changes to the Fiber tree as a work in progress branch or alternate branch.
- Then when the work is done, the alternate or work in progress branch becomes the main branch and the earlier main branch becomes the work in progress or alternate branch.
- Fiber tree is basically a combination of the real DOM tree and what we want the DOM tree to look like as represented by the React Element tree.
- How does React make the decision to go from React Element Tree to real DOM tree --> This is done through Reconciliation and Work: What needs to be done and how?
- Fiber tree contains pieces of the re-rendered DOM tree.
- React implements a reconciliation algorithm.
- This reconciliation algorithm looks at the current tree and the work in progress tree and figures out the steps that are needed to take on the "Real" tree.
- React makes a plan of what to do using the Fiber tree and executes that plan using the real DOM tree and then that is displayed on our screen.
- Fiber tree is not destroyed so it is used for lot of other fundamentally important things within React.
- Fiber tree is end of the day used to carry out reconciliation between the DOM tree and React Element tree.

# Execution Contexts and Pausing Works
- Execution Context and Event Loop
- All javascript code is run inside an execution context. There is the Global function which runs the user function
- In the browser, there is a queue of events as well. 
- Javascript Engine which resides inside the browser contains the Execution Stack and Queue.
- Javascript brings the code from the queue when the call stack is empty.
- React doesnot interrupt the code that is being executed.
- React keeps track of the code that is being executed.
- Fiber and Custom Execution Context
- React has its own execution contexts like BatchedContext, RenderContext, CommitContext.
- React runs its code inside its own execution context.
- React tells the browser that when it done executing other code, it can execute code provided by React
- React can pause its work and splits it work and tell the browser accordingly so that the rendering process is very efficient.
- What happens inside a Fiber tree doesnot happen all at once.

# Units of Work and the Work Loop
- Whatever work React needs to do it needs to pause, start, continue and basically allow the browser to continue doing its work. 
- End of the day React has to get its work done.
- React looks at the fiber tree and determines what needs to be done. For e.g do we need to add an element or remove an element. All of this is known as unit of work.
- React does all of this inside a work loop
- Equality on Javascript: This is a tricky concept.
- React only does work when something changed.
- Object.is(a,b) --> Checks if a and b are equal (by reference)

# Beginning, Completing, Bailing Out and Pausing Work
- Organizing Work
- Memoization: Store the result of a computation so that we dont have to repeat the computation itself.
- memoized Props means the values that were passed to the function
- if there is no work to be done we can do bailing out. React is trying to be efficient.
- In React Unit of Work, we can begin, bail out and complete our unit of work.
- React organizes work well so it has places where other things can be done.
- Inside the work, it can choose not to execute the work till certain things happen on the browser.
- React helps the app to appear fast in the browser.
- React moves through the fiber tree and does work using the nodes of the fiber tree.
  

  # Lanes and Priority
  - Lanes are how react prioritizes the work
  - We can order the work using Lanes
  - We have functions like getHighestPriorityLanes
  - Also we have offscreen lanes--> means lowest priority work
  - React ensures our application renders to the user as quickly as possible.
  
  # React DOM and Rendering
  - We have 3 trees: React Element Tree, Fiber Tree and real DOM tree
  - React does work to match the Fiber Tree to the React Element Tree and then finally updates the DOM tree based on the Fiber tree.
  - Each step of the process called a unit of work is done at different points of time. 
  - Rendering essentially means reconciling the DOM tree and the Fiber tree.
  
  # Mounting, Updating and Unmounting in React
  - Hanging and removing
  - Mounting a component: In Fiber tree each component is a reference inside of a Fiber Node. The component itself will return React element objects which are converted into Fiber Nodes.
  - Reconciliation process is completed when the act of adding the DOM Nodes to the real DOM tree based on a particular component is known as mounting of a component. Basically the DOM nodes have been attached based on what the component should look like
  - Later Fiber tree may get a work in progress update where the component is updated
  - Component may be removed from the Fiber Tree and corresponding DOM nodes are removed so the component is unmounted.
  - Unmounting a component doesnot necessarily mean the component is removed from the DOM tree. It depends on what the Fiber tree looks like. It also depends on the reconciliation algorithm.
  - If the Fiber Node has a reference to the real DOM element, it means the component has been mounted to the real DOM tree.
  ***This is also known as React Lifecycle***
  - React allows us to carry our own code at different points in the lifecycle.
  - React lifecycle methods are hooks that allow you to run code at specific  points in a component's life. Here's a quick rundown:

    1. Mounting: When a component is being inserted into the DOM.
    - constructor(): Called before anything else. Great for setting initial state or binding methods.
    - componentDidMount(): Invoked immediately after a component is inserted. Ideal for fetching data or integrating with other libraries.

    2. Updating: When a component is being re-rendered due to changes in state or props.
    - shouldComponentUpdate(): Lets React know if re-rendering is necessary. Often used for performance optimization.
    - componentDidUpdate(): Called after updates. Useful for making network requests or updating the DOM based on the previous props or state.

    3. Unmounting: When a component is being removed from the DOM.
    - componentWillUnmount(): Used to clean up resources like event listeners or timers.

    4. Error Handling: Invoked when there's an error during rendering, in a lifecycle method, or in a constructor.
    -   componentDidCatch(): Allows you to handle errors gracefully.

***And now with Hooks, you get functions like useEffect() which combines lifecycle stages into a single API.***

# Events
- We need to deal with Events in React also
- DOM Events
- In javascript we add Event Listeners and define handlers like onClick() event handler(this is how browser implements dealing with user interaction)
- We can have multiple listeners
- Browser does something called event bubbling
- Handling the event on the innermost element and then moving up through the ancestors to handle the event.
- Lets say we have a ul --> li -->a-->a-->button
- If a has a click event then it is executed,  if li has a click event also, it is also executed, if ul has a click event, that is also executed
- Event Capturing: Handling the event on the outermost element, and then move down through the descendants to handle the same event
- so ul handles click first, then li and then a
- Capturing is rarely used.
- Built in way is using event bubbling.
- Event Propagation: Transmitting something in a particular direction through a medium. Basically it means event bubbling and event capturing. Moving the event through the DOM Nodes.
- Event Delegation: Assigning an event handler to an ancestor node in the tree.
- Lot of listeners are inefficient
- For large DOM trees, we can put a single listener on a single root element in hope that that element will receive the event.
- Instead of having multiple handlers for different buttons, react helps us. Rather than writing code for each button, React helps us by using React Event Objects

# How does React help us to work with Events provided by the browser

- React Event Objects
- React's approach to handling events is to use event delegation and then let us specify the individual targets on the events we want to handle
- React delegates all the events to the root of our DOM
- There is a listener at the root
- Event that was passed was not a DOM event
- It passes a synthentic base event which is a javascript object that react created. It has a target which is the button
- This synthentic base event is wrapper over the DOM(native) events and is also referred to as the React Event Object

## Synthentic Event Properties and Methods
- event.preventDefault(); --> This prevents the default behaviour
- event.stopPropagation(); --> Stops the bubbling of events
- Events and DOM updates are related through state.
  
# React State
- State: In the context of software, the data at any given time that describes the current state or condition of the system
- Finite State Machine: A model of a process that can be in a limited number of states. 
- It models the states, the inputs and the transitions between states in response to the inputs
- Deterministic: A predictable process that in the context of state machine always gives the same output given the same inputs and state.
- Pure functions help to make sure our state machine is deterministic and it remains consistent and predictable
- User Interface reflects the state of the system
- The underlying state machine must be deterministic, consistent and reliable.
- Functions we use to change state must be pure.
- User Interface is a function of state.
- By giving the same state to our components should give us the same React Element Tree.
## Reducers
- Functional programming is a style of programming where we organize our code into pure functions. React borrows a lot of concepts from functional programming.
- Our components are pure functions

## Actions and State
- Action is a description of what has occurred in an app and how state changes as a result
- Action is a very neat way of what is going on in my application.
- Anything that happens in our application is a sequence of actions


# Hooks and State
- Fiber tree is a good place to store state since it stays around
- Hooks is like attaching something to the tree
- Hook is attached to a branch of the tree
- State is stored inside hooks
- Hooks are directly connected to the fiber tree
- They are hanging off the nodes
- Each fiber node has lot of different properties and one of them is memoizedState. State ends up being a javascript object called a hook
- Hook is a javascript object
- Each fiber node can have a hook attached it and each hook can have another hook attached to it. These hooks are stored inside a linkedList. Hooks are lightweight data structure.
- These hooks are attached to the node of the tree
- Queue: FIFO data structure
- Each fiber node also has an updateQueue
- Each hook has state and queues
- This means a hook can have a list of items that can lined up and then we can flush the queue (Flushing means empty the data structure of its data and deal with its data)
***React can batch updates***
- Batching is processing multiple tasks as a single group. We may request the state to be updated in multiple hooks within our component. 
- React can choose to update all those hooks as one process rather than process each hook one at a time
- When state changes, UI should change
- What does react do? It updates the DOM tree based on React Element Tree defined inside the component with the Fiber Tree in-between
- So if the state changes, do we ask React to update each time ?
- We know that the tree is an output of state. So if the state changes, then the tree atleast should be checked to see if it should change or not
- We only need to re-render that piece of the tree where the state has changed.
- So if state in the hook attached to the list component changes, then list component should be re-rendered. Similarly if the state attached to the Counter component changes, then counter component should be re-rendered or its tree should be updated.
- If we change the state programmatically, react automatically knows that the state has changes so it should re-render the tree, in other words our function components should be executed again to see if the final output is different.
  
# useReducer Hook
- Most basic hook for managing state
- Dispatch: Sending the action to the reducer. Action has happened so reducing function should be called to get the new state.
- useReducer hook takes 2 arguments: one is the reducing function and other is the initial state. It returns the reference to the memoized state inside the hook and a reference to the dispatch function. 
- const [state, dispatch] = React.useReducer(()=>{},{clicks:0})
- Here we use array destructuring to get the current state inside the hook and the dispatch function
- If we analyze useReducer, we can see that our component Counter has a hook attached to it. This hook stores the state and has a reference to the method dispatch
- We can then use this dispatch method to call the reducer
- The reducer in turn changes the state which is stored as memoized state in the fiber node
- If the state changes, then it will force the Fiber Tree to re-render which will force the Real DOM to change as well.


```javascript

//use the Counter component
function App()
{
    return (
    <section>
        <h1>Counters</h1>
        <section>
            <Counter name="One"/>
        </section>
    </section>
    )
}

function Counter(props)
{
    const [state, dispatch] = React.useReducer((state,action)=>{
        switch(action.type)
        {
            //state changes which forces component to re-render
           case 'Increment': return {...state,clicks:state.clicks+1} 
           default:
            throw new Error();
        }
    },{clicks:0})
    return (    
        <article>
        <h2>Counter {props.name}</h2>
        <p>You clicked {state.clicks} times</p>
        <button onClick={()=>{
            dispatch({type:'Increment'})
        }} className="button" >
            Click Me!
        </button>
    </article>
    )
}

```

# useState hook
- Commonly used hook in React
- useState() is a specialized version of useReducer()
- Main difference with useReducer() is that we dont really pass a reducer function
- We just pass the initial value. There is a built in reducer function for useState
- It is called a basicStateReducer
- This basicStateReducer looks at our action and sets that to the state
- state itself is the value of the action
- useState returns an array with two elements: the current state value (count in this case) and a function to update it (setCount).
- You can use the setCount function to update the state, and React will re-render the component with the new state value.
- Here setNumOfClicks is really a dispatch function
- useState is a wrapper for useReducer

```javascript
//use the Counter component
function App()
{
    return (
    <section>
        <h1>Counters</h1>
        <section>
            <Counter name="One"/>
        </section>
    </section>
    )
}

function Counter(props)
{
    const [numOfClicks,setNumOfClicks] = React.useState(0);

    return (  
        <article>
        <h2>Counter {props.name}</h2>
        <p>You clicked {numOfClicks} times</p>
        <button onClick={()=>{
            setNumOfClicks(numOfClicks + 1)
        }} className="button" >
            Click Me!
        </button>
    </article>
    )
}

```

***What if we now have 2 counters instead of one like this***

```javascript
//use the Counter component
function App()
{
    return (
    <section>
        <h1>Counters</h1>
        <section>
            <Counter name="One"/>
            <Counter name="Two"/>
        </section>
    </section>
    )
}

```
- Note that now there will be 2 branches of the fiber tree one for Counter 1 and another for Counter 2
- Each branch will have its own hooks attached it to the node of the fiber tree with each counter being its own node. So each one will keep track of its own state
- Each of the hooks will store their state separately.
- Changing the state inside the hook within one particular fiber tree will cause that branch to trigger re-render of the DOM and the other branch will remain unaffected.
- Which effectively means that each of the counters one and two will manage their own state without one overriding the other.
- Updating counter 1 should not trigger update of counter 2 component
- Undirectional data flow: Data can only move in one direction, in case of react downwards
- Parent is always calling the child
- Parent can give the child a reference as to how to update the parent data
- We use JSX to generate a React Element Tree which in turn generates a React Fiber tree which holds a linked list of hooks and ultimately thanks to reconciliation causes the DOM tree to be updated.