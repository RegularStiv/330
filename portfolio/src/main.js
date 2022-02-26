function setDropDown(){
    const burgerIcon = document.querySelector('#burger');
    const navbarMenu = document.querySelector('#navbar-burger');
  burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active');
  });
  }
function setprojectdropdown(){
  document.querySelector("#projects").onclick = () =>{
    document.querySelector("#projects").childNodes.style.visibility = !document.querySelector("#projects").childNodes.style.visibility;
  }
}
function displayChildren(){
  document.querySelector("#projects").onclick = () =>{
    if(document.querySelector("#project-children").innerHTML != ''){
      document.querySelector("#project-children").innerHTML = ``;
    }
    else{
      document.querySelector("#project-children").innerHTML=`<li>
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
    //setprojectdropdown();
    document.querySelector("#projects").onclick = displayChildren;
    //console.log(document.querySelector("#project-children").style.visibility);
  }
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
  window.onload = init();
