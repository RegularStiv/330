    //lists of words
	//#region my version
	//#endregion
	//#region DRY version
		let arrayOne = [];
	let arrayTwo = [];
	let arrayThree = [];
	window.onload = function() {loadFunction()};
	function loadFunction(){
		const url = "data/babble-data.xml";
        const xhr = new XMLHttpRequest();
		xhr.onload = (e) => {
			const xml = e.target.responseXML;
            arrayOne = xml.querySelector("babblelist[cid='section1']").textContent.split(",");
            arrayTwo = xml.querySelector("babblelist[cid='section2']").textContent.split(",");
            arrayThree = xml.querySelector("babblelist[cid='section3']").textContent.split(",");

			generateTechno(5);
		};
		xhr.onerror = e => console.log("error");
		xhr.open("GET", url);
		
		xhr.send();
		
	}
	document.querySelector("#my-button").onclick = () => generateTechno(1);
	document.querySelector("#multi-button").onclick = () => generateTechno(5);
	function randomElement(array){
		return array[Math.floor(Math.random() * array.length)];
	}
	function generateTechno(num){
		for(let i = 0; i < num; i++)
		{	
			let string = "";
			for (let i = 0; i < num; i++)
			{
				string += `${loadRandom()} <br>` ;
			}
			
			document.querySelector("#output").innerHTML = string;
		}
	}
	function loadRandom() {
		return `${randomElement(arrayOne)} ${randomElement(arrayTwo)} ${randomElement(arrayThree)}`;
	}
	
	
	//#endregion