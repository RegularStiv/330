//import statements
import { loadFile, setDropDown, setNavActive } from "./utils.js";
import "./favorite-cards.js";
//key to all favorited spells
const favKey = "sar7743-fav-key";

const showSpell = spellObj =>{
    //logs the json
    console.log(spellObj);
    //creates a spell card
    const spellCard = document.createElement('fav-spell-card');
    //sets the name and level 
    spellCard.dataset.name = spellObj.name ?? "No name Found";
    spellCard.dataset.level = spellObj.level ?? "No name Found";
    //if the object does damage
    if(spellObj.damage){
        //gets damage if based on spell slot
        if(spellObj.damage.damage_at_slot_level){
            spellCard.dataset.damage = "Damage Dealt per spell slot " + spellObj.damage.damage_at_slot_level[`${spellObj.level}`] ?? "No name Found";
        }
        //gets damage if based on character level
        else if(spellObj.damage.damage_at_character_level){
            let array = JSON.stringify(spellObj.damage.damage_at_character_level).split(",");
            let string = "";
            array.forEach(element => {
                element += '\n';
                string += element;
            });
            spellCard.dataset.damage = "Damage dealt per level " + string ?? "No name Found";
        }
        //gets damage type if it exists
        if(spellObj.damage.damage_type.name){
            spellCard.dataset.higherLevel =  spellObj.damage.damage_type.name
        }
    }
    //gets healing based on spell slot
    else if(spellObj.heal_at_slot_level){
        let array = JSON.stringify(spellObj.heal_at_slot_level).split(",");
        let string = "";
        array.forEach(element => {
            element += '\n';
            string += element;
        });
        spellCard.dataset.damage = "Healing: " + string ;
        spellCard.dataset.higherLevel = "no damage type";
    }
    //sets damage type and damage/healing 
    else {
        spellCard.dataset.damage = "no damage applies";
        spellCard.dataset.higherLevel = "no damage type";
    }
    //sets desc range and url
    spellCard.dataset.desc = spellObj.desc ?? "No name Found";
    spellCard.dataset.range = spellObj.range ?? "No name Found";
    spellCard.dataset.url = spellObj.url ?? "NAN";
    //appends the section with the card
    document.querySelector("#img").appendChild(spellCard);
  };
//calls load file on a url
  const loadURL = (urlEnd) => {
    const url = `https://www.dnd5eapi.co${urlEnd}`;
    loadFile(url,showSpell);
  }
  //sets up the page onload
  function init(){
      //if the local storage array exists 
      if(JSON.parse(localStorage.getItem(favKey)) != null){
          //goes through the JSON and makes an array 
        let urlArray = JSON.parse(localStorage.getItem(favKey));
        for (const iterator of urlArray) {
            //loads each url in the array
            loadURL(iterator);
        }
      }
      //set up functions
      setNavActive();
      setDropDown();
  }
  window.onload = init;