import React, { useState } from 'react'

function AddCounter() {

  const [counterName,setCounterName] = useState('');
  const [startingValue,setStartingValue] = useState(1);

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(counterName);
    console.log(startingValue);
    
    //This returns the DOM element: form
    const form = event.target;
    //Something that the browser provides us to work with the data in the form(key-value pairs in the form)
    const formData = new FormData(form);
    console.log(...formData);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <>
        <form method='post' onSubmit={handleSubmit}>
        <h2>Add Counter</h2>
        <p>
            <label htmlFor='counterName'>Name</label>
            <input type="text" name="counterName" value={counterName} id="counterName" onChange={(event)=>{
              setCounterName(event.target.value)
            }} />
        </p>
        <p>
        <label htmlFor='startingValue'>Starting Value</label>
            <input value={startingValue} name="startingValue" type="number" id="startingValue" onChange={(event)=>{
              setStartingValue(event.target.value)
            }} />
        </p>
        <button type='submit'>Add</button>
        </form>
    </>
  )
}

export default AddCounter
