import "./proj-footer.js";
import "./proj-header.js";

// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active');
});

let pathName = window.location.pathname;
let page = pathName.split('/').pop();
const navbarItems = document.querySelectorAll(".navbar-item");
for (const n of navbarItems) {
    let nPageName = n.href.split("/").pop();
    if(nPageName == page){
        n.classList.toggle('is-active');
    }
}