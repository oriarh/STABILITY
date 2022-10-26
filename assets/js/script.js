var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var button = document.getElementById("submit");
var chartBtn = document.getElementById("chartBtn");
var chartRBtn = document.getElementById("chartRBtn");
var clearBtn = document.getElementById("clearStorage");



// This function is commented out because we have only a limited number of quotes we can generate.
// button.addEventListener("click", function (event) {
//     console.log(inputName.value);
//     //resources(wellnessResources);
//     generateQuote();
    
// });

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

//This event listener displays the line chart when the button is clicked
chartBtn.addEventListener("click", function handleclick() {
    var lineChart = document.getElementById("myChart");
    if (lineChart.style.display === "none") {
        lineChart.style.display = "block";
    } else {
        lineChart.style.display = "none";
    }
})

//This button displays the radar chart when clicked.
chartRBtn.addEventListener("click", function handleclick() {
    var radarChart = document.getElementById("myChartR");
    if (radarChart.style.display === "none") {
        radarChart.style.display = "block";
    } else {
        radarChart.style.display = "none";
    }
})

clearBtn.addEventListener("click", function handleclick() {
    localStorage.clear();
})

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

//This body of code will store user values in local storage.
storedValues(54, 13, 15, 41);
storedValues(5, 8, 2, 10);
storedValues(14, 2, 29, 45);
function storedValues(foodValue, fitnessValue, sleepValue, moodValue) {
    var valuesArry = [];
    var retrievedValues = localStorage.getItem("all-values");

    if (retrievedValues) {
        valuesArry = JSON.parse(retrievedValues);
    }

    var objValues = {
        foodKey : foodValue,
        fitnessKey : fitnessValue,
        sleepKey : sleepValue,
        moodKey : moodValue
    };

    valuesArry.push(objValues);

    valuesSet(valuesArry);

    function valuesSet(valArry) {
        var convertObj = JSON.stringify(valArry);
        localStorage.setItem("all-values", convertObj);
    }

    for (i = 0; i < valuesArry.length; i++) {
        var inputValue = valuesArry[i];
    }
    console.log(inputValue.foodKey);
    console.log(inputValue.fitnessKey);
    console.log(inputValue.sleepKey);
    console.log(inputValue.moodKey);
    addData(inputValue.foodKey, inputValue.fitnessKey, inputValue.sleepKey, inputValue.moodKey);
    addToRadar(inputValue.moodKey, inputValue.sleepKey, inputValue.foodKey, inputValue.fitnessKey);
}

