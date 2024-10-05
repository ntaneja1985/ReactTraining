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