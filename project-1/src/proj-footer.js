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
    <h2 id = "spell-name">title</h2>
    <button>X</button>
    <p id = "spell-level">Level Learned: </p>
    <p id = "spell-damage">Damage: </p>
    <p id = "spell-range">Range:</p>
    <p id = "spell-desc">Desc:</p>
    <p id = "spell-higher-level">HL:</p>

</div>
`;

class SpellCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:"open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector("button");
        this.h2 = this.shadowRoot.querySelector("h2");
        this.p1 = this.shadowRoot.querySelector("#spell-level");
        this.p2 = this.shadowRoot.querySelector("#spell-damage");
        this.p3 = this.shadowRoot.querySelector("#spell-range");
        this.p4 = this.shadowRoot.querySelector("#spell-desc");
        this.p5 = this.shadowRoot.querySelector("#spell-higher-level");;

    }
    connectedCallback(){
        this.button.onclick = () => this.remove();
        this.render();
    }
    disconnectedCallback(){
        this.button.onclick = null;
    }
    static get observedAttributes(){
        return ["data-name","data-desc","data-damage","data-higher-level", "data-range", "data-level"];
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>name not found</i>";
        const desc = this.getAttribute('data-desc') ? this.getAttribute('data-desc') : "desc not found";
        const damage = this.getAttribute('data-damage') ? this.getAttribute('data-damage') : "damage not found";
        const higherLevel = this.getAttribute('data-higher-level') ? this.getAttribute('data-higher-level') : "???";
        const range = this.getAttribute('data-range') ? this.getAttribute('data-range') : "range not found";
        const level = this.getAttribute('data-level') ? this.getAttribute('data-level') : "level not found";

        this.h2.innerHTML = name;
        this.p1.innerHTML = level;
        this.p2.innerHTML = damage;
        this.p3.innerHTML = range;
        this.p4.innerHTML = desc;
        this.p5.innerHTML = higherLevel;
    }

}
customElements.define('spell-card',SpellCard);