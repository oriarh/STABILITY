var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var button = document.getElementById("submit");

button.addEventListener("click", function (event) {
    console.log(inputName.value);

});






var predictedMood;
var food = $(inputFood);
var fitness = $(inputFitness);
var sleep = $(inputSleep);
var Mood = $(inputMood);
let coefFood = [0.25, 0.75];
let coefFitness = [0.25, 0.75];
let coatSleep = [0.25, 0.75];
let coefMood = [0.25, 0.5, 0.75];
let resultFood = food * coefFood[placeHolder];
let resultFitness = fitness * coeffitness[placeHolder];
let resultsleep = sleep * coefDleep[placeHolder];
let resultMood = Mood * coefMood[placeHolder];
let predictedValue = resultFood + resultFitness + resultMood + resultSleep;
if (predictedValue < 0.35) {
    predictedMood = 'Bad';
} else if (predictedValue < 0.55 && predictedValue >= 0.35) {
    predictedMood = 'Decent';
} else if (predictedValue > 0.55) {
    predictedMood = 'Good ';
}