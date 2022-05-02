
const template = document.createElement("template");
template.innerHTML = `
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<style>
#customFooter{
    color:#f3ffff;
    background-color: #3e8ed0;
}

</style>
<div class="columns is-centered is-info" id="customFooter">
    <div class = "column is-10"
<footer class="is-info">
    <p>Stephen Rumpp 5/1/2022</p>
</footer>
</div>
</div>`;

  class CustomFooter extends HTMLElement{
    constructor(){
        super();

        //sets the shadowroot elements 
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
  customElements.define('custom-footer',CustomFooter);