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
      document.querySelector("#projects-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8595`;
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
    document.querySelector("#projects-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8593`;
    }
  }
  
}
function displaySideChildren(){
  document.querySelector("#projects-aside-nav").onclick = () =>{
    if(document.querySelector("#project-side-children").innerHTML != ''){
      document.querySelector("#project-side-children").innerHTML = ``;
      document.querySelector("#projects-aside-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8595`;
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
    document.querySelector("#projects-aside-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8593`;
    }
    
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
