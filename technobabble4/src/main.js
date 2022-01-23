    //lists of words
	//#region my version
	//#endregion
	//#region DRY version
		let arrayOne = [];
	let arrayTwo = [];
	let arrayThree = [];
	window.onload = function() {loadFunction()};
	function loadFunction(){
		const url = "data/babble-data.csv";
        const xhr = new XMLHttpRequest();
		xhr.onload = (e) => {
			console.log(`In onload - HTTP Status Code  = ${e.target.status}`);
			let text = e.target.responseText;
			const lines = text.split('\n');
            arrayOne = lines[0].split(',');
            arrayTwo = lines[1].split(',');
            arrayThree = lines[2].split(',');

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