class LinkedListNode {
    constructor(val,next = null)
    {
        this.value = val;
        this.next = next;
    }
}

class LinkedList {
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

let myLinkedList = new LinkedList();
myLinkedList.append("nishant");
myLinkedList.append("neha");
myLinkedList.append("nalin");
myLinkedList.print();