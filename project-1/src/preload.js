
import "./proj-footer.js";
import "./proj-header.js";
import { loadFile } from "./utils.js";
let classSpells = [];
let levelSpells = [];
let spellArray = [];
let url = "https://www.dnd5eapi.co/api/spells?level=0";
let prefix = "sar7743-";
const searchBarKey = prefix + "searchKey";
const classKey = prefix + "classKey";
const spellKey = prefix + "spellKey";
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
document.querySelector("#class-select").onchange = filterSpells;
document.querySelector("#level-select").onchange = filterSpells;
document.querySelector("#search-button").onclick = filterSpellsButton;
function filterSpells() {
    document.querySelector("#img").innerHTML = " ";
    classSpells = [];
    levelSpells = [];
    spellArray = [];
    const filterClass = document.querySelector("#class-select").value;
    const filterSpell = document.querySelector("#level-select").value;
    let levelIndex = parseInt(document.querySelector("#level-select").options[document.querySelector("#level-select").selectedIndex].value);
    let classIndex = (document.querySelector("#class-select").options[document.querySelector("#class-select").selectedIndex].value);
    localStorage.setItem(spellKey,levelIndex);
    localStorage.setItem(classKey,classIndex);
    url = "https://www.dnd5eapi.co/api/classes/" + filterClass + "/spells";
    loadFile(url, getClassSpells);
    url = "https://www.dnd5eapi.co/api/spells?level=" + filterSpell;
    loadFile(url, getLevelSpells);
}
const getClassSpells = json =>{
    classSpells = json.results;
    classSpells.forEach(cSpell => {
        levelSpells.forEach(lSpell => {
            if(cSpell.name == lSpell.name){
                spellArray.push(cSpell);
            }
        });
    });
    if(spellArray.length != 0){
            for (const iterator of spellArray) {
            loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
        }
    }
}

const getLevelSpells = json =>{
    levelSpells = json.results;
    classSpells.forEach(cSpell => {
        levelSpells.forEach(lSpell => {
            if(cSpell.name == lSpell.name){
                spellArray.push(cSpell);
            }
        });
    });
    if(spellArray.length != 0){
            for (const iterator of spellArray) {
            loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
        }
    }
    
}
function filterSpellsButton(){
    document.querySelector("#img").innerHTML = " ";
    classSpells = [];
    levelSpells = [];
    spellArray = [];
    url = "https://www.dnd5eapi.co/api/spells/?name=";
    let search = document.querySelector("#search-box").value;
    url += search;
    loadFile(url, loopAllSpells);
    localStorage.setItem(searchBarKey,search);
}
const loopAllSpells = json => {
    for (const iterator of json.results) {
        loadFile("https://www.dnd5eapi.co"+iterator.url + "", showSpell);
    }
}
function init(){
    filterSpells();
    document.querySelector("#search-box").value = localStorage.getItem(searchBarKey);
    if(localStorage.getItem(classKey) == null){
        localStorage.setItem(classKey, 0);
    }
    else{
        document.querySelector("#class-select").value = localStorage.getItem(classKey);
    }
    if(localStorage.getItem(spellKey) == null){
        localStorage.setItem(spellKey, 0);
    }
    else{
        document.querySelector("#level-select").value = localStorage.getItem(spellKey);
    }
    
}

const showSpell = spellObj =>{
    console.log(spellObj);
    const spellCard = document.createElement('spell-card');
    spellCard.dataset.name = spellObj.name ?? "No name Found";
    spellCard.dataset.level = spellObj.level ?? "No name Found";
    if(spellObj.damage){
        if(spellObj.damage.damage_at_slot_level){
            spellCard.dataset.damage = "Damage Dealt per spell slot " + spellObj.damage.damage_at_slot_level[`${spellObj.level}`] ?? "No name Found";
        }
        else if(spellObj.damage.damage_at_character_level){
            let array = JSON.stringify(spellObj.damage.damage_at_character_level).split(",");
            let string = "";
            array.forEach(element => {
                element += '\n';
                string += element;
            });
            spellCard.dataset.damage = "Damage dealt per level " + string ?? "No name Found";
        }
        if(spellObj.damage.damage_type.name){
            spellCard.dataset.higherLevel =  spellObj.damage.damage_type.name
        }
    }
    else if(spellObj.heal_at_slot_level){
        let array = JSON.stringify(spellObj.heal_at_slot_level).split(",");
        let string = "";
        array.forEach(element => {
            element += '\n';
            string += element;
        });
        spellCard.dataset.damage = "Healing: " + string ;
    }
    else {
        spellCard.dataset.damage = "no damage applies";
        spellCard.dataset.higherLevel = "no damage type";
    }
    spellCard.dataset.desc = spellObj.desc ?? "No name Found";
    spellCard.dataset.range = spellObj.range ?? "No name Found";
    document.querySelector("#img").appendChild(spellCard);
  };

window.onload = init;