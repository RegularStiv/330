const template = document.createElement("template");
template.innerHTML = `
<style>
div{
    height: 340px;
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
  button{
      border-radius : 1px;
      padding:2px;
      position:absolute;
      top:1px;
      right:1px;
      opacity:.2;
  }
  button:hover{
      opacity: 1;
  }
img{
    width: 100px;
  }
</style>

<div>
    <h2></h2>
    <button>X</button>
    <img alt="mugshot">
    <p id = "swcHeight">Height: </p>
    <p id = "swcMass">Mass:</p>
    <p id = "swcHomeworld">homeworld:</p>
    <p id = "swcApprentices">apprentices:</p>
</div>
`;

class SWCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:"open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h2 = this.shadowRoot.querySelector("h2");
        this.img = this.shadowRoot.querySelector("img");
        this.p1 = this.shadowRoot.querySelector("#swcHeight");
        this.p2 = this.shadowRoot.querySelector("#swcMass");
        this.p3 = this.shadowRoot.querySelector("#swcHomeworld");
        this.p4 = this.shadowRoot.querySelector("#swcApprentices");
        this.button = this.shadowRoot.querySelector("button");
    }
    connectedCallback(){
        this.button.onclick = () => this.remove();
        this.render();
    }
    disconnectedCallback(){
        this.button.onclick = null;
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    static get observedAttributes(){
        return ["data-name", "data-height", "data-mass", "data-image","data-homeworld", "data-apprentices"];
    }

    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...character name...</i>";
        const height = this.getAttribute('data-height') ? this.getAttribute('data-height'): "0";
        const mass = this.getAttribute('data-mass') ? this.getAttribute('data-mass'): "0";
        const image = this.getAttribute('data-image') ? this.getAttribute('data-image'): "images/catimage-no-image.png";
        const homeworld = this.getAttribute('data-homeworld') ? this.getAttribute('data-homeworld'): "???";
        const apprentices = this.getAttribute('data-apprentices') ? this.getAttribute('data-apprentices'): "";
        let appList;
        let appHTML = "";
        if (apprentices){
            appList =  apprentices.split(",");
            appHTML = "<ul>";
            for (const a of appList) {
                appHTML += `<li>${a}</li>`
            }
            appHTML += "</ul>";
        }
        this.h2.innerHTML = `${name}`;
        this.p1.innerHTML = `Height: ${height}`;
        this.p2.innerHTML = `Mass: ${mass}`;
        this.p3.innerHTML = `Homeworld: ${homeworld}`;
       
        this.p4.innerHTML = `Apprentices: ${appHTML}`;
        this.img.src = image;
    }

}
customElements.define('sw-card', SWCard)