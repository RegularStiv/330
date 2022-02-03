const template = document.createElement("template");
template.innerHTML = `
<style>

</style>
<footer>
    &copy; 2021 Ace Coder
</footer>
`;

class SWFooter extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:"open"});

        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }
    connectedCallback(){
        this.render();
    }

    render(){
        footer.innerHTML = "&copy; 2022 Stephen Rumpp";
    }
}
customElements.define('sw-footer',SWFooter);