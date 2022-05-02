/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import "./navbar.js";
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';
import "./footer.js";
import "./header.js";
// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/New Adventure Theme.mp3"
});
const drawParams = {
    showGradient  : false,
    showBars      : false,
    showNoise     : false,
    showInvert    : false,
    emboss        : false,
    showLargeSprite : false,
    showSmallSprites : false
}

function init() {

    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    utils.loadFile('./media/data.json',defaultSetter);
    
    loop();
}
const defaultSetter = json =>{
    drawParams.showGradient = json.showGradient;
    drawParams.showBars = json.showBars;
    drawParams.showNoise = json.showNoise;
    drawParams.showInvert = json.showInvert;
    drawParams.showSmallSprites = json.showSmallSprites;
    drawParams.showLargeSprite = json.showLargeSprite;
    document.querySelector("#gradientCB").checked = json.gradientCB;
    document.querySelector("#barsCB").checked = json.barsCB;
    document.querySelector("#spriteCB").checked = json.spriteCB;
    document.querySelector("#spriteSmallCB").checked = json.spriteSmallCB;
    document.querySelector("#noiseCB").checked = json.noiseCB;
    document.querySelector("#invertCB").checked = json.invertCB;
    document.querySelector("#embossCB").checked = json.embossCB;
};
function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };
    playButton.onclick = e => {
        if (audio.audioCTX.state == "suspended") {
            audio.audioCTX.resume();
        }
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            playButton.innerHTML ="Pause";
            e.target.dataset.playing = "yes";
        } else {
            audio.pauseCurrentSound();
            playButton.innerHTML ="Play";
            e.target.dataset.playing = "no";
        }
    };
    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");
    volumeSlider.oninput = e => {
        audio.setVolume(e.target.value);
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    };
    volumeSlider.dispatchEvent(new Event("input"));

    let sizeSlider = document.querySelector("#sizeSlider");
    let sizeLabel = document.querySelector("#sizeLabel");
    sizeSlider.oninput = e => {
        sizeLabel.innerHTML = e.target.value;
    };
    sizeSlider.dispatchEvent(new Event("input"));

    let rotationSlider = document.querySelector("#rotationSlider");
    let rotationLabel = document.querySelector("#rotationLabel");
    rotationSlider.oninput = e => {
        rotationLabel.innerHTML = ((e.target.value));
    };
    rotationSlider.dispatchEvent(new Event("input"));

    let scrollSlider = document.querySelector("#scrollSlider");
    let scrollLabel = document.querySelector("#scrollLabel");
    scrollSlider.oninput = e => {
        scrollLabel.innerHTML = ((e.target.value));
    };
    scrollSlider.dispatchEvent(new Event("input"));

    let spawnSlider = document.querySelector("#spawnSlider");
    let spawnLabel = document.querySelector("#spawnLabel");
    spawnSlider.oninput = e => {
        if(e.target.value < 1.5){
            spawnLabel.innerHTML = "slow";
        }
        else if(e.target.value > 2.5 && e.target.value < 4){
            spawnLabel.innerHTML = "fast";
        }
        else if(e.target.value >= 4){
            spawnLabel.innerHTML = "fastest";
        }
        else{
            spawnLabel.innerHTML = "normal"; 
        }
    };
    spawnSlider.dispatchEvent(new Event("input"));
    
    let trackSelect = document.querySelector("#trackSelect");
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    }
    document.querySelector("#gradientCB").onchange = () =>{
        if(document.querySelector("#gradientCB").checked){drawParams.showGradient = true;}
        else{drawParams.showGradient = false;}
    }
    document.querySelector("#barsCB").onchange = () =>{
        if(document.querySelector("#barsCB").checked){drawParams.showBars = true;}
        else{drawParams.showBars = false;}
    }
    document.querySelector("#spriteSmallCB").onchange = () =>{
        if(document.querySelector("#spriteSmallCB").checked){drawParams.showSmallSprites = true;}
        else{drawParams.showSmallSprites = false;}
    }
    document.querySelector("#spriteCB").onchange = () =>{
        if(document.querySelector("#spriteCB").checked){drawParams.showLargeSprite = true;}
        else{drawParams.showLargeSprite = false;}
    }
    document.querySelector("#noiseCB").onchange = () =>{
        if(document.querySelector("#noiseCB").checked){drawParams.showNoise = true;}
        else{drawParams.showNoise = false;}
    }
    document.querySelector("#invertCB").onchange = () =>{
        if(document.querySelector("#invertCB").checked){drawParams.showInvert = true;}
        else{drawParams.showInvert = false;}
    }
    document.querySelector("#embossCB").onchange = () =>{
        if(document.querySelector("#embossCB").checked){drawParams.emboss = true;}
        else{drawParams.emboss = false;}
    }
    
} // end setupUI
function loop(time = 0){
    requestAnimationFrame(loop);
    canvas.draw(drawParams,time);
    
}
export { init };