class LinkedListNode {
    constructor(val,next = null)
    {
        this.value = val;
        this.next = next;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(val) {
        const newNode = new LinkedListNode(val);
        //If there is no head yet, lets make new Node a head
        if(!this.head)
        {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        
        //Attach new Node to the end of the linkedList
        this.tail.next = newNode;
        this.tail = newNode;
        return this;  
    }

    pop(){
        let originalHead = this.head;
        if(this.head)
        {
            this.head = this.head.next;
        }
        return originalHead ? originalHead.value: null;
    }
    print()
    {
        let printedVal = "";
        let currentNode = this.head;
        while(currentNode){
            if(currentNode.next != null)
            {
            printedVal += currentNode.value + "-->";
            }
            else {
                printedVal += currentNode.value;
            }
            currentNode = currentNode.next;
        }
        console.log(printedVal)
    }
}

let myQueue = new Queue();
myQueue.append("nishant");
myQueue.append("neha");
myQueue.append("nalin");
myQueue.print();
console.log(myQueue.pop());
myQueue.print();
console.log(myQueue.pop());
myQueue.print();