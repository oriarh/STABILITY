var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var submitBtn = document.getElementById("submit");
var chartBtn = document.getElementById("chartBtn");
var chartRBtn = document.getElementById("chartRBtn");
var clearBtn = document.getElementById("clearStorage");


//This function calls out the functions for the quotes & resource APIs and mood prediction on click.
// This function is commented out because we have only a limited number of quotes we can generate.
submitBtn.addEventListener("click", function (event) {
    //console.log(inputName.value);
    //resources(wellnessResources);
    //generateQuote();
    predictionFinal();
});

// This API fetches a resource - Please do not run this repeatedly as there is a limit to fetches we can make
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

//This API returns a motivational quote - Please do not run this repeatedly as there is a limit to fetches we can make
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

//This body of code will store user values in local storage.
function storedValues(fitnessValue, foodValue, sleepValue, moodValue) {
    var valuesArry = [];
    var retrievedValues = localStorage.getItem("all-values");

    if (retrievedValues) {
        valuesArry = JSON.parse(retrievedValues);
    }

    var objValues = {
        fitnessKey : fitnessValue,
        foodKey : foodValue,
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
    // console.log(inputValue.foodKey);
    // console.log(inputValue.fitnessKey);
    // console.log(inputValue.sleepKey);
    // console.log(inputValue.moodKey);
    addData(inputValue.fitnessKey, inputValue.foodKey, inputValue.sleepKey, inputValue.moodKey);
    addToRadar(inputValue.moodKey, inputValue.sleepKey, inputValue.foodKey, inputValue.fitnessKey);
}


//Immanuel's formula for prediction
// if its a yes 0.75 and if its a no 0.25
// var predictedMood;
// var food = $(inputFood);
// var fitness = $(inputFitness);
// var sleep = $(inputSleep);
// var Mood = $(inputMood);
// let coefFood = [0.25, 0.75];
// let coefFitness = [0.25, 0.75];
// let coatSleep = [0.25, 0.75];
// let coefMood = [0.25, 0.5, 0.75];
// let resultFood = food * coefFood[placeHolder];//what we put in the placeholder is gonna be based on the previous history that we well fetch from local storage
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

//The following code fetches the users response and previous data from localStorage to predict the next mood.
var predictedMood;
var exerciseYes = document.getElementById("exerciseYes");
var exerciseNo = document.getElementById("exerciseNo");

var dietYes = document.getElementById("dietYes");
var dietNo = document.getElementById("dietNo");

var sleepYes = document.getElementById("sleepYes");
var sleepNo = document.getElementById("sleepNo");

var moodGood = document.getElementById("moodGood");
var moodNormal = document.getElementById("moodNormal");
var moodBad = document.getElementById("moodBad");

var exercise;
var diet;
var sleep;
var mood;




function predictionFinal () {
    var allValues = JSON.parse(localStorage.getItem("all-values"));
    if (allValues) {
        for (i = 0; i < allValues.length; i++) {
            var lastValue = allValues[allValues.length - 1]
        }
    }
    
    console.log(lastValue);

    if (exerciseYes.checked) {
        exercise = 0.75;
    }
    else {exercise = 0.25;}

    if (dietYes.checked) {
        diet = 0.75;    
    }
    else {diet = 0.25;}

    if (sleepYes.checked) {
        sleep = 0.75;    
    }
    else {sleep = 0.25;}

    if (moodGood.checked) {
        mood = 0.75 ;   
    }
    else if (moodNormal.checked) {
        mood = 0.5;
    }
    else {mood = 0.25;}

    storedValues(exercise, diet, sleep, mood);

    console.log(exercise);
    console.log(diet);
    console.log(sleep);
    console.log(mood);

    if (lastValue == null) {
        var resultExercise = exercise;
        var resultDiet = diet;
        var resultSleep = sleep;
        var resultMood = mood;
    } else {
        resultExercise = exercise * lastValue.fitnessKey;
        resultDiet = diet * lastValue.foodKey;
        resultSleep  = sleep * lastValue.sleepKey;
        resultMood = mood * lastValue.moodKey;
        var predictedValue = resultExercise + resultDiet + resultSleep + resultMood;
    }


    console.log(resultExercise);
    console.log(resultDiet);
    console.log(resultSleep);
    console.log(resultMood);


    if (predictedValue < 0.35) {
        predictedMood = 'Bad';
    } else if (predictedValue < 0.55 && predictedValue >= 0.35) {
        predictedMood = 'Decent';
    } else if (predictedValue > 0.55) {
        predictedMood = 'Good ';
    } else if (predictedValue == null) {
        predictedMood = 'Prediction will be made after your next input';
    }

    console.log(predictedValue);
    console.log(predictedMood);
    }