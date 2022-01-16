
//in class examples
// function addThem(num1,num2){
//     return num1+num2;
// }
// const addThem2 = (num1,num2) => {
//     return num1 + num2;
// };
// 1 - get a reference to the button
let button = document.querySelector("button");
// 2 - add a click event to button that calls a `sayHello` function
button.onclick = sayHello;
// 3 - create a `sayHello()` function
function sayHello(){
    
    let first = document.querySelector("#input-firstname").value ? document.querySelector("#input-firstname").value : "Jeremy";
    let last = document.querySelector("#input-lastname").value ? document.querySelector("#input-lastname").value : "Hat";

    document.querySelector("#output").innerHTML = `Hello ${first} ${last}`;
}
// 3A - get name of person from the <input>
// 3B - get a reference to the #output <p>
// 3C - update HTML of #output <p>
