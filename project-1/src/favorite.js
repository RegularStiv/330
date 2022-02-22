import { loadFile, setNavActive } from "./utils.js";
import "./favorite-cards.js";

const favKey = "sar7743-fav-key";
const showSpell = spellObj =>{
    console.log(spellObj);
    const spellCard = document.createElement('fav-spell-card');
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
    spellCard.dataset.url = spellObj.url ?? "NAN";
    document.querySelector("#img").appendChild(spellCard);
  };

  const loadURL = (urlEnd) => {
    const url = `https://www.dnd5eapi.co${urlEnd}`;
    loadFile(url,showSpell);
  }
  function init(){
      if(JSON.parse(localStorage.getItem(favKey)) != null){
        let urlArray = JSON.parse(localStorage.getItem(favKey));
        for (const iterator of urlArray) {
            loadURL(iterator);
        }
      }
      setNavActive();
  }
  window.onload = init;