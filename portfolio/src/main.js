function setDropDown(){
  const burgerIcon = document.querySelector('#burger');
  const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active');
});
}
function displayNavChildren(){
  document.querySelector("#projects-nav").onclick = () =>{
    if(document.querySelector("#project-nav-children").innerHTML != ''){
      document.querySelector("#project-nav-children").innerHTML = ``;
    }
    else{
      document.querySelector("#project-nav-children").innerHTML=`<li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Changeling
      </a>
    </li>
    <li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    <li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    <li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    `;
    }
    console.log("click");
  }
}
function displaySideChildren(){
  document.querySelector("#aside-nav").onclick = () =>{
    if(document.querySelector("#project-side-children").innerHTML != ''){
      document.querySelector("#project-side-children").innerHTML = ``;
    }
    else{
      document.querySelector("#project-side-children").innerHTML=`<li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Changeling
      </a>
    </li>
    <li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    <li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    <li>
      <a href="#" class ="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    `;
    }
    console.log("click");
  }
}
  function init(){
    setDropDown();
    document.querySelector("#aside-nav").onclick = displaySideChildren;
    document.querySelector("#projects-nav").onclick = displayNavChildren;
    displaySideChildren();
    displayNavChildren();
  }
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
  window.onload = init();
