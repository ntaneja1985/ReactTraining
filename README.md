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