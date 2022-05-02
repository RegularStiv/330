/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;
let lastTime = 0;
let deltaTime = 0;
let lastRotate = Math.PI * 2;
let spawnTimer = 2.5;
let spawnedObjects = [];
let rotationSpeed;
let scrollSpeed;
let spawnSpeed ;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
document.querySelector("#clearSmallSprites").onclick = () =>{spawnedObjects =[];};
function setupCanvas(canvasElement,analyserNodeRef){
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"blue"},{percent:.25,color:"green"},{percent:.5,color:"yellow"},{percent:.75,color:"red"},{percent:1,color:"magenta"}]);
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);
}
class smallSprite  {
    constructor(image, posX, posY,width,height){
        this.image = image;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}
function draw(params={},time = 0){
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference"  
	analyserNode.getByteFrequencyData(audioData);
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
	
    deltaTime = (time - lastTime)/1000;
	deltaTime = clamp(deltaTime,1/144,1/12);
	lastTime = time;

    
	// 2 - draw background
	ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();
		
	// 3 - draw gradient
	if(params.showGradient){
        ctx.save();
        let imageEl;
        if(document.querySelector("#trackSelect").value == "media/noire.mp3"){
            imageEl = document.querySelector("#scene");
        }
        if(document.querySelector("#trackSelect").value == "media/New Adventure Theme.mp3"){
            imageEl = document.querySelector("#jungle");
        }
        if(document.querySelector("#trackSelect").value == "media/Peanuts Theme.mp3"){
            imageEl = document.querySelector("#snoopy");
        }
        if(document.querySelector("#trackSelect").value == "media/The Picard Song.mp3"){
            imageEl = document.querySelector("#space");
        }
        let pat = ctx.createPattern(imageEl, "repeat");
        ctx.fillStyle = pat;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);


        ctx.restore();
    }
    
	// 4 - draw bars
	if(params.showBars){
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing = 100;
        
        ctx.save();
        if(document.querySelector("#trackSelect").value == "media/noire.mp3"){
            ctx.fillStyle = `rgba(255,255,255,0.50)`;
        }
        if(document.querySelector("#trackSelect").value == "media/New Adventure Theme.mp3"){
            ctx.fillStyle = `rgba(0,0,0,0.50)`;
        }
        if(document.querySelector("#trackSelect").value == "media/Peanuts Theme.mp3"){
            ctx.fillStyle = `rgba(255,255,255,0.50)`;
        }
        if(document.querySelector("#trackSelect").value == "media/The Picard Song.mp3"){
            ctx.fillStyle = `rgba(255,0,0,0.50)`;
        }
        ctx.strokeStyle = `rgba(0,0,0,0.50)`;
        for(let i = 0; i< audioData.length; i++){
            //ctx.drawImage(image,margin + i * (barWidth + barSpacing),topSpacing + 256 - audioData[i], barWidth, audioData[i] + barHeight);
            ctx.fillRect(margin + i * (barWidth + barSpacing),topSpacing + 256 - audioData[i], barWidth,audioData[i] +barHeight);
            ctx.strokeRect(margin + i * (barWidth + barSpacing),topSpacing + 256 - audioData[i], barWidth,audioData[i] +barHeight);
        }
        
        ctx.restore();
    }

    if(params.showLargeSprite){
        rotationSpeed = document.querySelector("#rotationSlider").value;
        spawnSpeed = document.querySelector("#spawnSlider").value;
        let maxRadius = canvasHeight * ((document.querySelector("#sizeSlider").value / 2)) * .75;
        ctx.save();
        ctx.globalAlpha = 1;
        let percent = 0;
        for(let i = 0; i < audioData.length; i++){
            percent += audioData[i] / 255;
        }
        percent /= (audioData.length / 2);
        let circleRadius = percent * maxRadius;
        let imageEl ;
        if(document.querySelector("#trackSelect").value == "media/noire.mp3"){
            imageEl = document.querySelector("#sherlock");
        }
        if(document.querySelector("#trackSelect").value == "media/New Adventure Theme.mp3"){
            imageEl = document.querySelector("#adventure-girl");
        }
        if(document.querySelector("#trackSelect").value == "media/Peanuts Theme.mp3"){
            imageEl = document.querySelector("#snoopy");
        }
        if(document.querySelector("#trackSelect").value == "media/The Picard Song.mp3"){
            imageEl = document.querySelector("#spok");
        }
        imageEl.height =  circleRadius;
        imageEl.width = circleRadius;
        ctx.translate((canvasWidth/2 ), (canvasHeight/2));
        ctx.rotate(lastRotate);
        ctx.translate(-canvasWidth/2 , -canvasHeight/2 );
        ctx.drawImage(imageEl,canvasWidth/2 - imageEl.width/2,canvasHeight/2 - imageEl.height/2, imageEl.width,imageEl.height);
        lastRotate += deltaTime * rotationSpeed;
        ctx.restore();
    }


    if(params.showSmallSprites) {
        scrollSpeed = document.querySelector("#scrollSlider").value;
        let maxRadius = canvasHeight/5 * ((document.querySelector("#sizeSlider").value ));
        let image;
        ctx.save();
        ctx.globalAlpha = 1;
        let percent = 0;
        for(let i = 0; i < audioData.length; i++){
            percent += audioData[i] / 255;
        }
        percent /= (audioData.length / 2);
        let circleRadius = percent * maxRadius;
        if(document.querySelector("#trackSelect").value == "media/noire.mp3"){
            image = document.querySelector("#mag-glass");
        }
        if(document.querySelector("#trackSelect").value == "media/New Adventure Theme.mp3"){
            image = document.querySelector("#adventure");
        }
        if(document.querySelector("#trackSelect").value == "media/Peanuts Theme.mp3"){
            image = document.querySelector("#snoopy");
        }
        if(document.querySelector("#trackSelect").value == "media/The Picard Song.mp3"){
            image = document.querySelector("#enterprise");
        }
        image.height =  circleRadius;
        image.width = circleRadius;
        if(spawnTimer > (3/spawnSpeed)){
            spawnedObjects.push(new smallSprite(image,0,Math.floor(Math.random() * canvasHeight),image.width,image.height));
            spawnTimer = 0;
        }
        for(let i = 0; i < spawnedObjects.length; i++){
            if(image != spawnedObjects[i].image){
                spawnedObjects.splice(i,1);
                break;
            }
            if(spawnedObjects[i].posX > canvasWidth){
                spawnedObjects.splice(i,1);
                break;
            }
            spawnedObjects[i].width = circleRadius;
            spawnedObjects[i].height = circleRadius;
            ctx.drawImage(spawnedObjects[i].image, spawnedObjects[i].posX, spawnedObjects[i].posY,  spawnedObjects[i].width, spawnedObjects[i].height);
            spawnedObjects[i].posX += 20 * deltaTime * (scrollSpeed);
            
        }
        ctx.restore();
        spawnTimer += deltaTime;
    }
    // 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary

	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
	// the variable `data` below is a reference to that array 
	let imageData = ctx.getImageData(0,0,canvasWidth,canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i+= 4){
		// C) randomly change every 20th pixel to red
        if(params.showInvert){
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
			// data[i+3] is the alpha channel
            let red = data[i], green = data[i+1],blue = data[i+2];
			data[i] = 255 - red;// zero out the red and green and blue channels
			data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;// make the red channel 100% red
		} // end if
        if(params.showNoise && Math.random() < .05){
            data[i] = data[i+1] = data[i+2] = 0;
            data[i] = 255;
            data[i+1] = 255;
            data[i+2] = 255;
        }

	} // end for
	if(params.emboss){
        for(let i = 0; i < length; i++){
            if(i%4 == 3)continue;
            data[i] = 127 + 2*data[i] - data[i+4] - data [i + width *4];
        }   
    }
	// D) copy image data back to canvas
    ctx.putImageData(imageData,0,0);
}
export {setupCanvas,draw, spawnedObjects};