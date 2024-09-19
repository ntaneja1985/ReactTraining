<# ReactTraining
React Training by Tony Alicea

React source code is open source:
https://github.com/facebook/react

React is other people's javascript code. Its not a blackbox.
DOM and Declarative Programming
<section>
<ul>
<li>Section 1</li>
<li>Section 2</li>
<li>Section 3</li>
</ul>
</section>

All of these elements form part of a tree.
When the browser reads in the text file(html file), it renders objects in computer memory in form of a tree. These objects have references to one another. It is a tree of objects. This tree models what was there in the document. This is known as the document object model (DOM).

DOM: Collection of objects in the computer's memory that represent the HTML elements that define a webpage. It provides the ability to analyze and change the document being presented to the user.

DOM: tree data structure
Root is at the top
Root --> Parent -->Child

HTML is a text file which is read in -->
Browser converts it into the DOM -->
Collection of objects in computer memory -->
Browser takes these collection of objects and paints(renders) the web page to the user screen.

DOM Manipulation
We can change the DOM tree
When the DOM tree is changed, the browser re-renders the webpage.
Browser APIs are the endpoints through which our user code can talk to the browser code

Lets say we want to append a child to an element in HTML. It is not a standard javascript function. It is provided by the browser that we can call from our javascript code. It causes our DOM to re-render.

We have 2 types of engines:
1. Javascript Engine (C++)
2. Rendering Engine (C++)

Both engines sit inside the browser. Using Javascript code we can provide them with instructions to manipulate the DOM via Browser APIs

When we write :
<script src="./app.js"/> inside the body tag, it ensures that DOM elements have already been created when this javascript is run.


Building dynamic web applications means manipulating the DOM.
Manipulating the DOM is an expensive task.
We need to minimize the work at manipulating the DOM.

IMPERATIVE VS DECLARATIVE PROGRAMMING

IMPERATIVE PROGRAMMING: Style of programming in which we describe how a program should do its task:
For e.g how a dog should tie its shoes

DECLARATIVE PROGRAMMING: Style of programming in which we declare what we want the program to accomplish without describing how.

DECLARATIVE PROGRAMMING SYSTEM IS BUILT ON TOP OF IMPERATIVE PROGRAMMING.

We rely on programming done by other developers

