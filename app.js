const person1 = {
    firstName: 'Nishant',
    lastName: 'Taneja',
    course: {
        name: 'Understanding React'
    }
}

const person2 = {
    firstName: 'Nishant',
    lastName: 'Taneja',
    course: {
        name: 'Understanding React'
    }
}


const person3 = person1;

//Comparison by Reference
console.log(Object.is(person1,person2))

console.log(Object.is(person1,person3))

const objectIs = Object.is;

function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    } // Test for A's keys different from B.


    for (var i = 0; i < keysA.length; i++) {
      var currentKey = keysA[i];

      if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) {
        return false;
      }
    }

    return true;
  }

  console.log(shallowEqual(person1,person2))