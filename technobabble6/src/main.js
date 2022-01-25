    //lists of words
	//#region my version
	//#endregion
	//#region DRY version
	let arrayOne = [];
	let arrayTwo = [];
	let arrayThree = []; 
	window.onload = function() {loadFunction()};
	function loadFunction(){
		const url = "data/babble-data.json";
        const xhr = new XMLHttpRequest();
		xhr.onload = (e) => {
			const string = e.target.responseText;
			const json = JSON.parse(string);
			const keys = Object.keys(json);

            arrayOne = json[keys[0]].babblelist1;
            arrayTwo = json[keys[1]].babblelist2;
            arrayThree = json[keys[2]].babblelist3;

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

		let string = "";
		for (let i = 0; i < num; i++)
		{
			string += `${loadRandom()} <br>` ;
		}
			
		document.querySelector("#output").innerHTML = string;
	}
	function loadRandom() {
		return `${randomElement(arrayOne)} ${randomElement(arrayTwo)} ${randomElement(arrayThree)}`;
	}
	
	
	//#endregion