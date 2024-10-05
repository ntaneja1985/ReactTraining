// const listElement = document.getElementById("list");
// const newListItem = document.createElement("li");
// newListItem.textContent = "Item 3";
// //Browser API
// setTimeout(()=>{
//     listElement.appendChild(newListItem);
// },3000)

//Example of imperative programming
//we tell the browser how to update the DOM via explicit instructions
//For complex apps this is tough

// function setCount() {
//     const countElement = document.getElementById("count");
//     count =  Number(countElement.textContent);
//     count = count + 1;
//     countElement.textContent = count;
// }



const CountApp = {
    getCount: () =>{
        const countElement = document.getElementById("count");
        return Number(countElement.textContent);
    },
    setCount: (val) =>{
        const countElement = document.getElementById("count");
        countElement.textContent = val;
    }
}

//Example of Declarative Programming
//Here we are not really bothered about the DOM. We just get the value and set the value
function setCount() {
    let count = CountApp.getCount();
    count = count + 1;
    CountApp.setCount(count);
}

function countDown(num)
{
    console.log(num);
    if(num === 0)
    {
        return;
    }
    countDown(num - 1);
}

countDown(5);


//Example of a virtual DOM
//Looks like declarative code
//Tree like structure
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

//Need imperative code to make declarative code work
//Real DOM Object
const main = document.getElementById("app");
console.log(main)

//method to add the elements to the real DOM from the POJO object
//this is how we add elements from virtual DOM to the main DOM
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