function setDropDown() {
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
    else if(window.outerWidth >768){
      document.querySelector("#project-nav-children").innerHTML=`
      <li>
                <a href="#changeling-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Changeling
                </a>
              </li>
              <li>
                <a href="#snake-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Snake
                </a>
              </li>
              <li>
                <a href="#unity-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Unity
                </a>
              </li>
              <li>
                <a href="#norman-the-neckbeard-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Norman the Neckbeard
                </a>
              </li>
    `;
    document.querySelector("#projects-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8593`;
    }
    else if(window.outerWidth < 768){
      document.querySelector("#project-nav-children").innerHTML=`
      <li>
                <a href="#changeling-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Changeling
                </a>
              </li>
              <li>
                <a href="#snake-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Snake
                </a>
              </li>
              <li>
                <a href="#unity-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Unity
                </a>
              </li>
              <li>
                <a href="#norman-the-neckbeard-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Norman the Neckbeard
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
      <a href="#changeling" class="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Changeling
      </a>
    </li>
    <li>
      <a href="#snake" class="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Snake
      </a>
    </li>
    <li>
      <a href="#unity" class="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Unity
      </a>
    </li>
    <li>
      <a href="#norman-the-neckbeard" class="has-text-white">
        <span class="icon is-small"><i class="fa fa-link"></i></span> Norman the Neckbeard
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
  window.onresize = function(){
    if(window.innerWidth >768){
      document.querySelector("#project-nav-children").innerHTML=`
      <li>
                <a href="#changeling-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Changeling
                </a>
              </li>
              <li>
                <a href="#snake-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Snake
                </a>
              </li>
              <li>
                <a href="#unity-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Unity
                </a>
              </li>
              <li>
                <a href="#norman-the-neckbeard-nav" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Norman the Neckbeard
                </a>
              </li>
    `;
    document.querySelector("#projects-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8593`;
    }
    else {
      document.querySelector("#project-nav-children").innerHTML=`
      <li>
                <a href="#changeling-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Changeling
                </a>
              </li>
              <li>
                <a href="#snake-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Snake
                </a>
              </li>
              <li>
                <a href="#unity-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Unity
                </a>
              </li>
              <li>
                <a href="#norman-the-neckbeard-nav-mobile" class="has-text-white">
                <span class="icon"><i class="fa fa-table"></i></span> Norman the Neckbeard
                </a>
              </li>
    `;
    document.querySelector("#projects-nav").innerHTML = `<span class="icon"><i class="fa fa-table"></i></span> Projects &#8593`;
    }
  }
