import { loadTextXHR, randomElement } from "./utils.js";

const appDataURL = "data/app-data.json";
let output,textarea;

//const toggleBackground = e => e.target.style.background = e.target.style.background === "black" ? "white" : "black";
const replaceWithRhyme = e => {
  const span = e.target;
  const word = span.textContent.trim();
  const ryhmes = RiTa.rhymes(word);
  span.textContent = randomElement(ryhmes);
  span.style.background = "yellow";
};
const createBlackoutText = () => { 
  console.log("createBlackoutText() called");
  // #5 - clear out #output, that's where the blackout text will go
  document.querySelector("#output").textContent = "";
  // #6 - grab the value of the <textarea> and store it in a variable named `string`
  let string = document.querySelector("textarea").textContent;
  // #7 - turn `string` into an array of words and loop through it 
  // Here we want to turn each word into a clickable <span>
  // When a <span> is clicked on, its background color will toggle between black and white
  // Add each <span> to #output
  // Test it!
  let stringArray = [];
  stringArray = string.split(" ");

  
  // for(let i = 0; i < stringArray.length; i++)
  // {
  //   let span = document.createElement("span");
  //   span.innerHTML = "<span>" + stringArray[i] + "</span>";
  //   //span.onclick = toggleBackground;
  //   document.querySelector("#output").appendChild(span);
  // }
  const html = stringArray.map(w => `<span>${w}</span>`).join("");
  output.innerHTML = html;
  document.querySelector("#output").onclick = replaceWithRhyme;
}	

const setupUI = json => {
  // #1 -  Hook up the `output` and `textarea` variables (already declared up top) to the appropriate elements
  textarea = document.querySelector("textarea");
  output = document.querySelector("#output");

  // #2 - populate the rest of the UI with loaded text
  // here we use a *descendant selector* to get a ref to the <h1> in the <header> 
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
  document.querySelector("header h1").textContent = json.title;
  document.querySelector("header h2").textContent = json.subtitle;
  // - the h2 in the header should show the .subtitle text
  // - the instructions-1 <div>
  document.querySelector("#instructions-1").textContent = json["instructions-1"];
  // - the instructions-2 <div>
  document.querySelector("#instructions-2").textContent = json["instructions-2"];
  // - the <textarea> should be populated with the default-text
  document.querySelector("textarea").textContent = json["default-text"];
  // #3 - Hook up the button onclick to the createBlackoutText() function
  document.querySelector("#btn-create").onclick =  () => createBlackoutText;
  // #4 - call createBlackoutText()
  createBlackoutText();
};

const appDataLoaded = e => {
  let json
  try{
    json = JSON.parse(e.target.responseText);
  }catch{
    document.querySelector("header h1").innerHTML = "BAD JSON!";
		return;
  }
  // #0 - AFTER the data has loaded, set up the UI
  setupUI(json);
};

loadTextXHR(appDataURL,appDataLoaded);