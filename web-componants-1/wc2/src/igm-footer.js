const template = document.createElement("template");
template.innerHTML = `
<style>
:host{
    display: block;
    background-color: #ddd;
}
span{
    color: #F76902;
    font-variant: small-caps;
    font-weight: bolder;
    font-family: sans-serif;
    user-select: none;
}
hr{
    border: 3px solid red;
  }
</style>
<span></span>
<span id = "org"></span>
<hr>
`;
class IGMFooter extends HTMLElement{
    constructor(){
        super();
        // 1 attaach shadow dom to dom tree
        this.attachShadow({mode:"open"});
        // 2 clone template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        // put this at the end of the constructor
        if(!this.dataset.year) this.dataset.year = 1989;
        if(!this.dataset.text) this.dataset.text = "Bill & Ted";
        this.dataset.count = 0;
        // This line of code will create an property named `span` for us, so that we don't have to keep calling this.shadowRoot.querySelector("span");
        this.span = this.shadowRoot.querySelector("span");
        
    }
    //5 called when the componant is added to the page
    connectedCallback(){
        this.span.onclick = () => {
            let year = +this.dataset.year + 1;
            this.dataset.year = year;
            let count = +this.dataset.count + 1;
            this.dataset.count = count;
          };
        //   this.shadowRoot.querySelector("hr").onclick = () => {
        //     this.remove();
        //    }
        this.render();
    }

    //6 a helper method to display the values of the attributes
    render(){
        const year = this.getAttribute('data-year') ? this.getAttribute('data-year') : "1995";
        const text = this.getAttribute('data-text') ? this.getAttribute('data-text') : "Nobody";
        const org = this.getAttribute('data-org') ? this.getAttribute('data-org') : "IGM";
        const count = this.getAttribute('data-count');
        this.shadowRoot.querySelector("span").innerHTML = `&copy; Copyright ${year}, ${text} Count: ${count}`;
        this.shadowRoot.querySelector("#org").innerHTML = `Organization: ${org}`;
    }
    static get observedAttributes(){
        return ["data-year", "data-text"];
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    disconnectedCallback(){
        this.span.onclick = null;
      }
}
customElements.define('igm-footer', IGMFooter);