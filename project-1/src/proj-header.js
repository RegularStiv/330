const template = document.createElement("template");
template.innerHTML = `
<style>

</style>
<header>
    Project 1
</header>
`;

class ProjHeader extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:"open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }
    connectedCallback(){
        this.render();
    }

    render(){
        header.innerHTML = "Project 1";
    }
}
customElements.define('proj-header',ProjHeader);