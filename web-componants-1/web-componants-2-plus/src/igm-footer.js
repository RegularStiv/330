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
        
    }
    //5 called when the componant is added to the page
    connectedCallback(){
        this.render();
    }

    //6 a helper method to display the values of the attributes
    render(){
        const year = this.getAttribute('data-year') ? this.getAttribute('data-year') : "1995";
        const text = this.getAttribute('data-text') ? this.getAttribute('data-text') : "Nobody";
        const org = this.getAttribute('data-org') ? this.getAttribute('data-org') : "IGM";

        this.shadowRoot.querySelector("span").innerHTML = `&copy; Copyright ${year}, ${text},`;
        this.shadowRoot.querySelector("#org").innerHTML = `Organization: ${org}`;
    }
}
customElements.define('igm-footer', IGMFooter);