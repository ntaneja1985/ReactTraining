const listElement = document.getElementById("list");
const newListItem = document.createElement("li");
newListItem.textContent = "Item 3";
//Browser API
setTimeout(()=>{
    listElement.appendChild(newListItem);
},3000)
