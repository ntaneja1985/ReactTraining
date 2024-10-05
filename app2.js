const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);
rootNode.className = 'root'
let counterName = "One"
root.render(React.createElement(App));
//console.log(React);

function App()
{
    return React.createElement("section", null, 
        React.createElement("h1", null, "Counters"),
        React.createElement("section",null,
            React.createElement(CounterAlternative,null)
        //    counterName === "One" ? React.createElement(Counter,{name:counterName})
        //                          : React.createElement(Counter2,{name:counterName})
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

function CounterAlternative()
{
    //console.log(props)
    //console.log("Called App")
    return (
        //React.createElement("button",null,"Click me")
            React.createElement("article", null,
            React.createElement("h2",null,"Counter"),
            React.createElement("p",null,"You clicked 1 time(s)"),
            React.createElement("button",{className:"button",name:"NishantButton"},"Click Me"))
           )
}

function Counter2({name})
{
    //console.log(props)
    //console.log("Called App")
    return (
        //React.createElement("button",null,"Click me")
            React.createElement("article", null,
            React.createElement("h2",null,"Counter ",name),
            React.createElement("p",null,"Times clicked: 1"),
            React.createElement("button",null,"Click Me"))
           )
}

// console.log(App());
// //console.log(React.createElement(App))

// // before React does it work
// // React works asynchronously
// // React waits for Javascript engine to be available
// // React exhibits this behaviour on purpose, so that it doesnt block the user or doesnt block the code
// // It waits for the rest of our javascript code to be run before doing its work
// let articleElements = document.getElementsByTagName("article");
// let articleElement = document.getElementsByTagName("article").item(0);
// console.log(articleElements);
// console.log(articleElement);

// //after React does it work
// setTimeout(()=>{
//     let articleElements = document.getElementsByTagName("article");
//     let articleElement = document.getElementsByTagName("article").item(0);
//     console.log(articleElements);
//     console.log(articleElement);
// },2000)