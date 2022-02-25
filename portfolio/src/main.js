function setDropDown(){
    const burgerIcon = document.querySelector('#burger');
    const navbarMenu = document.querySelector('#menu-links');
  
  burgerIcon.addEventListener("click", () => {
      navbarMenu.classList.toggle('is-active');
  });
  }