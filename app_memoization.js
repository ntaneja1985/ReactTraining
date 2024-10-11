function memoizedSquare(a){
    let memoizedResults = {};
    return function sq(a){
        if(a in memoizedResults)
        {
            return memoizedResults[a];
        }
        const result = a*a;
        memoizedResults[a] = result;
        return result;
    }
}

const memoSq = memoizedSquare();
console.time();
console.log(memoSq(489897));
console.timeEnd();
console.log(memoSq(4));
console.log(memoSq(6));
console.time();
console.log(memoSq(489897));
console.timeEnd();
