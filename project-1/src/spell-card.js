//sets up the template of the card (html and css)
const template = document.createElement("template");
template.innerHTML = `
<style>
div{
    height: 200px;
    width: 170px;
    border: 1px solid gray;
    padding: .5rem;
    background-color: #f4f4f4;
    overflow: scroll;
    font-size: .7rem;
    position: relative;
  } 
  
h2{
    font-size: 1.1rem;
    font-family: SfDistantGalaxy, sans-serif;
    letter-spacing: .67px;
    line-height: 1.2;
    margin-top: 0;
  } 
  button:hover{
      opacity: 1;
  }
img{
    width: 100px;
  }
</style>
<div>
    <h2 id = "spell-name">title</h2>
    <button id = "fav-button">fav</button>
    <p id = "spell-level">Level Learned: </p>
    <p id = "spell-damage">Damage: </p>
    <p id = "spell-range">Range:</p>
    <p id = "spell-desc">Desc:</p>
    <p id = "spell-higher-level">HL:</p>
    <p id = "url"></p>
</div>
`;
//custom card class
class SpellCard extends HTMLElement{
    constructor(){
        super();
        //sets up shadowroot
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        //sets up the button onclick
        this.button = this.shadowRoot.querySelector("#fav-button");
        this.button.onclick = () =>{
            this.buttonCallBack(this.getAttribute('data-url'));
            this.button.innerHTML = "Favorited";
        }
        this.render();
    }
    //stores the attributes that are being used
    static get observedAttributes(){
        return ["data-name","data-desc","data-damage","data-higher-level", "data-range", "data-level","data-url"];
    }
    //logs the changes in values of observed attributes
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    render(){
        //const url = this.getAttribute('data-url') ? this.getAttribute('data-url') : "<i>name not found</i>";
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>name not found</i>";
        const desc = this.getAttribute('data-desc') ? this.getAttribute('data-desc') : "desc not found";
        const damage = this.getAttribute('data-damage') ? this.getAttribute('data-damage') : "damage not found";
        const higherLevel = this.getAttribute('data-higher-level') ? this.getAttribute('data-higher-level') : "???";
        const range = this.getAttribute('data-range') ? this.getAttribute('data-range') : "range not found";
        const level = this.getAttribute('data-level') ? this.getAttribute('data-level') : "level not found";

        //this.url.innerHTML = url;
        this.shadowRoot.querySelector("h2").innerHTML = name;
        this.shadowRoot.querySelector("#spell-level").innerHTML = level;
        this.shadowRoot.querySelector("#spell-damage").innerHTML = damage;
        this.shadowRoot.querySelector("#spell-range").innerHTML = range;
        this.shadowRoot.querySelector("#spell-desc").innerHTML = desc;
        this.shadowRoot.querySelector("#spell-higher-level").innerHTML = higherLevel;
    }

}
//defines the element
customElements.define('spell-card',SpellCard);