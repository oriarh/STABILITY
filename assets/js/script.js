var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var button = document.getElementById("submit");

button.addEventListener("click", function (event) {
    console.log(inputName.value);
    //resources(wellnessResources);
    generateQuote();
    
});

//This API fetches a resource 
wellnessResources = "https://mental-health-info-api.p.rapidapi.com/news/"

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3c313ca13emshc988d22656a2bf6p161138jsn6b514aadf4e3',
		'X-RapidAPI-Host': 'mental-health-info-api.p.rapidapi.com'
	}
};

function resources(urlHere){
    fetch(urlHere,options)
    .then(function (response) {
        console.log(response.status);
        return response.json();
        }
    )
    .then(function(data) {
        console.log(data);
        //document.getElementById('title').textContent = data[Math.floor(Math.random()*67)].title;
        document.getElementById('url').href = data[Math.floor(Math.random()*67)].url;
        document.getElementById('url').textContent = data[Math.floor(Math.random()*67)].url;
        document.getElementById('source').textContent = data[Math.floor(Math.random()*67)].source; 
        }
    )

}

//This API returns a motivational quote
const quote = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3c313ca13emshc988d22656a2bf6p161138jsn6b514aadf4e3',
		'X-RapidAPI-Host': 'motivational-content.p.rapidapi.com'
	}
};

function generateQuote() {
    fetch('https://motivational-content.p.rapidapi.com/quotes/'+ Math.floor(Math.random()*650), quote)
        .then(response => response.json())
        .then(function(data){
        console.log(data);
        var quote = document.createElement("p");
        quote.textContent = data.quote;
        document.getElementById("results").appendChild(quote);
        
        })
        .catch(err => console.error(err));
}

// var predictedMood;
// var food = $(inputFood);
// var fitness = $(inputFitness);
// var sleep = $(inputSleep);
// var Mood = $(inputMood);
// let coefFood = [0.25, 0.75];
// let coefFitness = [0.25, 0.75];
// let coatSleep = [0.25, 0.75];
// let coefMood = [0.25, 0.5, 0.75];
// let resultFood = food * coefFood[placeHolder];
// let resultFitness = fitness * coeffitness[placeHolder];
// let resultsleep = sleep * coefDleep[placeHolder];
// let resultMood = Mood * coefMood[placeHolder];
// let predictedValue = resultFood + resultFitness + resultMood + resultSleep;
// if (predictedValue < 0.35) {
//     predictedMood = 'Bad';
// } else if (predictedValue < 0.55 && predictedValue >= 0.35) {
//     predictedMood = 'Decent';
// } else if (predictedValue > 0.55) {
//     predictedMood = 'Good ';
// }