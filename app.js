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