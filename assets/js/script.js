var startBtn = document.getElementById("startBtn");
var submitBtn = document.getElementById("submit");
var chartLinePlotBtn = document.getElementById("chartLinePlotBtn");
var chartRadarBtn = document.getElementById("chartRadarBtn");
var clearBtn = document.getElementById("clearStorage");
var landing = document.getElementById("landing");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");
var moodHistory = document.getElementById("moodHistory");
var returnHome = document.getElementById("returnHome");
var storedValuesPredictedMood = [] //This array contains the previous predicted moods - its pushed to localstorage
var storedValuesMood = [] //This array contains the previous actual moods - its pushed to localstorage

//They pull the previous mood history from the local storage for and push them up to the variables
if (localStorage.getItem("predictedMood") != null) {
    storedValuesPredictedMood = JSON.parse(localStorage.getItem("predictedMood"));
}

if (localStorage.getItem("actualMood") != null) {
    storedValuesMood = JSON.parse(localStorage.getItem("actualMood"));
};

//Start button on the landing page to start the app
startBtn.addEventListener("click", function handleclick() {
    landing.hidden = true;
    section2.hidden = false;
    section3.hidden = true;
    moodHistory.hidden = true;
})


//This function calls out the functions for the quotes & resource APIs and mood prediction on click.
// This function is commented out because we have only a limited number of quotes we can generate.
submitBtn.addEventListener("click", function (event) {
    
    //resources(wellnessResources);
    //generateQuote();
//This is the submit button that records the user input and displays history, predicted moods & resources.
submitBtn.addEventListener("click", function () {
    resources(wellnessResources);
    generateQuote();
    predictionFinal();

    localStorage.setItem("predictedMood", JSON.stringify(storedValuesPredictedMood));
    localStorage.setItem("actualMood", JSON.stringify(storedValuesMood));

    section2.hidden = true;
    moodHistory.hidden = false;
    section3.hidden = false;
    clearHistory();
    generateHistory();
});

//This function uses an API that fetches a wellnessresource for display to the user if the mood is decent or bad.
wellnessResources = "https://mental-health-info-api.p.rapidapi.com/news/"

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3c313ca13emshc988d22656a2bf6p161138jsn6b514aadf4e3',
        'X-RapidAPI-Host': 'mental-health-info-api.p.rapidapi.com'
    }
};

function resources(urlHere) {
    if(moodBad.checked || moodNormal.checked) {
        fetch(urlHere, options)
            .then(function (response) {
                return response.json();
            }
            )
            .then(function (data) {
                document.getElementById('results').hidden = false;
                document.getElementById('url').href = data[Math.floor(Math.random() * 67)].url;
                document.getElementById('url').textContent = data[Math.floor(Math.random() * 67)].url;
                document.getElementById('source').textContent = data[Math.floor(Math.random() * 67)].source;
            }
            )
    }

}

//This function uses an API that fetches a wellnessresource for display to the user if the mood is decent or bad.
const quote = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3c313ca13emshc988d22656a2bf6p161138jsn6b514aadf4e3',
        'X-RapidAPI-Host': 'motivational-content.p.rapidapi.com'
    }
};

function generateQuote() {
    fetch('https://motivational-content.p.rapidapi.com/quotes/' + Math.floor(Math.random() * 650), quote)
        .then(response => response.json())
        .then(function (data) {
            var quote = document.createElement("p");
            quote.textContent = data.quote;
            document.getElementById("results").appendChild(quote);

        })
        .catch(err => console.error(err));
}

//This event listener displays the line chart when the button is clicked
chartLinePlotBtn.addEventListener("click", function handleclick() {
    var myChart = document.getElementById("myChart");

    if (myChart.hidden === true) {
        myChart.hidden = false;
    } else {
        myChart.hidden = true;
    }
})

//This button displays the radar chart when clicked.
chartRadarBtn.addEventListener("click", function handleclick() {
    var radarChart = document.getElementById("chartRadar");
    if (radarChart.hidden === true) {
        radarChart.hidden = false;
    } else {
        radarChart.hidden = true;
    }
})

//This button clears the local storage
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
        fitnessKey: fitnessValue,
        foodKey: foodValue,
        sleepKey: sleepValue,
        moodKey: moodValue
    };

    valuesArry.push(objValues);

    valuesSet(valuesArry);

    function valuesSet(valArry) {
        var convertObj = JSON.stringify(valArry);
        localStorage.setItem("all-values", convertObj);
    }
}

//function to store chart values for 7 days
function chartValues(fitnessValue, foodValue, sleepValue, moodValue) {
    var chartArry = [];
    var retrievedChartValues = localStorage.getItem("chart-values");

    if (retrievedChartValues) {
        chartArry = JSON.parse(retrievedChartValues);
    }

    var objChartValues = {
        fitChartKey : fitnessValue,
        foodChartKey : foodValue,
        sleepChartKey : sleepValue,
        moodChartKey : moodValue
    }

    if (chartArry.length > 6) {
        chartArry.shift();
        chartArry.push(objChartValues);
    } else {
        chartArry.push(objChartValues);
    }
   
    localStorage.setItem("chart-values", JSON.stringify(chartArry));
    
    addData(chartArry)
}

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

function predictionFinal() {
    var allValues = JSON.parse(localStorage.getItem("all-values"));
    if (allValues) {
        for (i = 0; i < allValues.length; i++) {
            var lastValue = allValues[allValues.length - 1]
        }
    }

    if (exerciseYes.checked) {
        exercise = 0.75;
    }
    else { exercise = 0.25; }

    if (dietYes.checked) {
        diet = 0.75;
    }
    else { diet = 0.25; }

    if (sleepYes.checked) {
        sleep = 0.75;
    }
    else { sleep = 0.25; }

    if (moodGood.checked) {
        mood = 0.75;
        storedValuesMood.push("Good");
    }
    else if (moodNormal.checked) {
        mood = 0.5;
        storedValuesMood.push("Decent");
    }
    else {
        mood = 0.25;
        storedValuesMood.push("Bad");
    }

    storedValues(exercise, diet, sleep, mood);
    chartValues(exercise, diet, sleep, mood);

    if (lastValue == null) {
        var resultExercise = exercise;
        var resultDiet = diet;
        var resultSleep = sleep;
        var resultMood = mood;
    } else {
        resultExercise = exercise * lastValue.fitnessKey;
        resultDiet = diet * lastValue.foodKey;
        resultSleep = sleep * lastValue.sleepKey;
        resultMood = mood * lastValue.moodKey;
        var predictedValue = resultExercise + resultDiet + resultSleep + resultMood;
    }

    if (predictedValue < 0.35) {
        predictedMood = 'Bad';
    } else if (predictedValue < 0.55 && predictedValue >= 0.35) {
        predictedMood = 'Decent';
    } else if (predictedValue > 0.55) {
        predictedMood = 'Good ';
    } else if (predictedValue == null) {
        predictedMood = 'Prediction will be made after your next input';
    }

    storedValuesPredictedMood.push(predictedMood);
}

//This function fetches values from localstorage to generate user history since day 1
function generateHistory() {
    var allValues = JSON.parse(localStorage.getItem("all-values"));
    var prevPredictedMood = JSON.parse(localStorage.getItem("predictedMood"));
    var prevActualMood = JSON.parse(localStorage.getItem("actualMood"));
    if (allValues != null) {
        for (i = 0; i < prevActualMood.length; i++) {
            var calenderBox = document.createElement('div');
            var dayEl = document.createElement('span');
            var predictedMoodEl = document.createElement('span');
            var moodEl = document.createElement('span');

            calenderBox.setAttribute("class", "calendarBox pure-u-1-5");
            dayEl.setAttribute("class", "boxElements");
            predictedMoodEl.setAttribute("class", "boxElements");
            moodEl.setAttribute("class", "boxElements");

            dayEl.textContent = "Day " + (i + 1);
            predictedMoodEl.textContent = "Prediction: " + prevPredictedMood[i];
            moodEl.textContent = "Actual Mood: " + prevActualMood[i];

            document.getElementById("clearHistory").appendChild(calenderBox);
            calenderBox.append(dayEl, predictedMoodEl, moodEl);
        }
        }
};

//Function the Div element where the history boxes are appended. Otherwise the submit was printing in addition to the previous values printed
function clearHistory() {
    document.getElementById("clearHistory").textContent = "";
};

//This function takes the user back to the landing page
returnHome.addEventListener("click", function handleclick() {
    window.location.reload();
});

//Future development Initiatives for the web application 
//Generate Random Data for future development of charts.
let numofDayMetrics = 1;
let numOfDays = 60;
let numOfMetrics = numOfDays * numofDayMetrics;

var metricTimes = ['7:45'];
const repeat = (arr, n) => Array(n).fill(arr).flat();
var repeatMetricTimes = repeat(metricTimes, numOfDays);

tmpExercise = Array.from({ length: numOfMetrics }, () => Math.floor(Math.random() * 2));
tmpDiet = Array.from({ length: numOfMetrics }, () => Math.floor(Math.random() * 2));
tmpSleep = Array.from({ length: numOfMetrics }, () => Math.floor(Math.random() * 2));
tmpMood = Array.from({ length: numOfMetrics }, () => Math.floor(Math.random() * 3));

// Function to Change data into yes and nos
changeTypeString = function (arrayInfo, isBinary) {
    var arrayInfoSwitched = [];
    var tmpInfo;
    if (isBinary == true) {
        for (const element of arrayInfo) {
            if (element == 1) {
                tmpInfo = 0.75;
            } else {
                tmpInfo = 0.25;
            }
            arrayInfoSwitched.push(tmpInfo);
        }
    } else {
        for (const element of arrayInfo) {
            if (element == 2) {
                tmpInfo = 0.75;
            } else if (element == 1) {
                tmpInfo = 0.5;
            } else if (element == 0) {
                tmpInfo = 0.25;
            }
            arrayInfoSwitched.push(tmpInfo);
        }
    }

    return arrayInfoSwitched;
}


// This is for Line Plot for future development
var diet60 = changeTypeString(tmpDiet, true);
var sleep60 = changeTypeString(tmpSleep, true);
var exercise60 = changeTypeString(tmpExercise, true);
var mood60 = changeTypeString(tmpMood, false);

// This partition is for the Radar Plot
// Recent Month Days
var recentMonthDiet = diet60.slice(-30);
var recentMonthSleep = sleep60.slice(-30);
var recentMonthExercise = exercise60.slice(-30);
var recentMonthMood = mood60.slice(-30);

// Recent Week Days
var recentWeekDiet = diet60.slice(-7);
var recentWeekSleep = sleep60.slice(-7);
var recentWeekExercise = exercise60.slice(-7);
var recentWeekMood = mood60.slice(-7);

// Past Month Days
var oldMonthDiet = diet60.slice(0,30);
var oldMonthSleep = sleep60.slice(0,30);
var oldMonthExercise = exercise60.slice(0,30);
var oldMonthMood = mood60.slice(0,30);

// Past Weeks Days
var oldWeekDiet = diet60.slice(-14,-7);
var oldWeekSleep = sleep60.slice(-14,-7);
var oldWeekExercise = exercise60.slice(-14,-7);
var oldWeekMood = mood60.slice(-14,-7);

const average = array => array.reduce((a, b) => a + b) / array.length;

// Plotting based on olddata
// for (let i = 0; i < tmpNumOfDays; i++) {
//     storedValues(exercise60[59 - i], diet60[59 - i], sleep60[59 - i], mood60[59 - i]);
//   }
