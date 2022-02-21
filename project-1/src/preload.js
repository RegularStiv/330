
import "./proj-footer.js";
import "./proj-header.js";
import { loadFile } from "./utils.js";
let movieJSON = {};
let url = "https://www.dnd5eapi.co/api/spells?level=0";
// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active');
});

//#region active where person is in the site
let pathName = window.location.pathname;
let page = pathName.split('/').pop();
const navbarItems = document.querySelectorAll(".navbar-item");
for (const n of navbarItems) {
    let nPageName = n.href.split("/").pop();
    if(nPageName == page){
        n.classList.toggle('is-active');
    }
}
//#endregion

// const selectChange = e => {
//     const dndID = e.target.value;
//     if(movID == 0) return; // if it's the first <option>, return
//     const movObj = movieJSON[movID]; // movie object
//     if(movObj) showCharacter(movObj);
//   };

const jsonLoaded = json => {
    
    for (const iterator of json.results) {
        console.log(iterator.level);
        if(iterator.level == `${filterSpell}`){
            loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
        }
        
    }
}
function filterSpells() {
    const filterClass = document.querySelector("#class-select").value;
    const filterSpell = document.querySelector("#level-select").value;
    console.log(filterSpell);
    console.log(filterClass);
    url = "https://www.dnd5eapi.co/api/classes/" + filterClass + "/spells";
    let classSpells = loadFile(url,console.log);
    url = "https://www.dnd5eapi.co/api/spells?level=" + filterSpell;
    let levelSpells = loadFile(url,console.log);
    let spellArray = [];
    classSpells.forEach(cSpell => {
        levelSpells.forEach(lSpell => {
            if(cSpell.name == lSpell.name){
                spellArray.push(cSpell);
            }
        });
    });
    for (const iterator of spellArray) {
        loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
    }
    console.log("done");

}
const init = () => {
    filterSpells();
}

const showSpell = spellObj =>{
    console.log(spellObj);
    const spellCard = document.createElement('spell-card');
    spellCard.dataset.name = spellObj.name ?? "No name Found";
    spellCard.dataset.level = spellObj.level ?? "No name Found";
    //spellCard.dataset.damage = spellObj.damage.damage_at_slot_level[`${spellObj.level}`] ?? "No name Found";
    spellCard.dataset.desc = spellObj.desc ?? "No name Found";
    //spellCard.dataset.higherLevel = spellObj.damage.damage_type.name ?? "No name Found";
    spellCard.dataset.range = spellObj.range ?? "No name Found";
    document.querySelector("#img").appendChild(spellCard);
  };

window.onload = init;