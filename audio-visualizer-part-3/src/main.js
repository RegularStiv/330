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

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/New Adventure Theme.mp3"
});
const drawParams = {
    showGradient  : true,
    showBars      : true,
    showCircles   : true,
    showNoise     : false,
    showInvert    : false,
    emboss        : false,
    showLargeSprite : true
}

function init() {

    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    document.querySelector("#gradientCB").checked = true;
    document.querySelector("#barsCB").checked = true;
    document.querySelector("#circlesCB").checked = true;
    document.querySelector("#spriteCB").checked = true;
    document.querySelector("#noiseCB").checked = false;
    loop();
}

function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };
    playButton.onclick = e => {
        console.log(`audioCTX.state before  = ${audio.audioCTX.state}`);

        if (audio.audioCTX.state == "suspended") {
            audio.audioCTX.resume();
        }
        console.log(`audioCTX.state after  = ${audio.audioCTX.state}`);
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        } else {
            audio.pauseCurrentSound();
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
    document.querySelector("#circlesCB").onchange = () =>{
        if(document.querySelector("#circlesCB").checked){drawParams.showCircles = true;}
        else{drawParams.showCircles = false;}
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
function loop(){
    requestAnimationFrame(loop);
    canvas.draw(drawParams);

    // let audioData = new Uint8Array(audio.analyserNode.fftSize/2);

    // audio.analyserNode.getByteFrequencyData(audioData);

    // console.log(audioData);

    // console.log("------Audio Stats------");
    // let totalLoudness = audioData.reduce((total,num)=> total + num);
    // let averageLoudness = totalLoudness/(audio.analyserNode.fftSize/2);
    // let minLoudness = Math.min(...audioData);
    // let maxLoudness = Math.max(...audioData);
    // let loudnessAt2K = audioData[11];

    // console.log(`average loudness = ${averageLoudness}`);
    // console.log(`min loudness = ${minLoudness}`);
    // console.log(`max loudness = ${maxLoudness}`);
    // console.log(`loudness at 2k= ${loudnessAt2K}`);
    // console.log("----------------");
}
export { init };