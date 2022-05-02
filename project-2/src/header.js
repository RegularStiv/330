
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
<div class="columns is-centered " id="customFooter">
    <div class = "column is-4 is-centered "
<header class="">
    <p>Welcome to the audio visualizer. Use the controls to change your expirience</p>
</header>
</div>
</div>`;

  class CustomHeader extends HTMLElement{
    constructor(){
        super();

        //sets the shadowroot elements 
        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
  customElements.define('custom-header',CustomHeader);