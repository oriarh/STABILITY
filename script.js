var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var button = document.getElementById("submit");
var chartBtn = document.getElementById("chartBtn");




button.addEventListener("click", function (event) {
    console.log(inputName.value);

});


chartBtn.addEventListener("click", function handleclick() {
    var lineChart = document.getElementById("myChart");
    if (lineChart.style.display === "none") {
        lineChart.style.display = "block";
    } else {
        lineChart.style.display = "none";
    }
})