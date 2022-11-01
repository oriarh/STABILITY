// setup block for line graph
var data = {
  labels : ["something"],
  datasets: [{
      label: 'exercise',
      data: [2],
      borderColor: "red",
      fill: false,
      borderWidth: 2
  },{ 
    label: 'food',
    data: [2],
      borderColor: "blue",
      fill: false,
      borderWidth: 2
  },{
    label: 'sleep',
    data: [2],
      borderColor: "green",
      fill: false,
      borderWidth: 2
  },{
    label: 'mood',
    data: [2],
      borderColor: "purple",
      fill: false,
      borderWidth: 2
  }]
};
// config block
var config = {
type: 'line',
  data,
  options: {
      scales: {
          // xAxis: {
          //   display: true,
          //   parsing: false,
          //   type: 'time',
          //   time: {
          //     unit: 'day'
          //   }
          // },
          y: {
              beginAtZero: true
          }
      }
  }
};

// render / init block
var myChart = new Chart(
document.getElementById('myChart'),
config
);

function addData(arryVals) {
var dayOfWeekName = new Date().toLocaleString(
  'default', {weekday: 'long'}
)
console.log(dayOfWeekName);

for (i = 0; i < arryVals.length; i++) {
  myChart.data.datasets[0].data.push(arryVals[i].fitChartKey);
  myChart.data.datasets[1].data.push(arryVals[i].foodChartKey);
  myChart.data.datasets[2].data.push(arryVals[i].sleepChartKey);
  myChart.data.datasets[3].data.push(arryVals[i].moodChartKey);
  myChart.data.labels.push(dayOfWeekName);
  console.log(arryVals[i].foodChartKey);
}


 myChart.update();
console.log(myChart.data.datasets);
}

// Chart for radar
var xValuesR = ["Mood","Diet","Exercise","Sleep"];
var chartRadar = document.getElementById('chartRadar').getContext('2d');

var chartRadar = new Chart("chartRadar", {
  type: "radar",
data: {
  labels: xValuesR,
  datasets: [{
    data: [],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    data: [],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }, {
    data: [],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }, {
    data: [],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
},
options: {
  legend: {display: false}
}
});



function addToRadar(foodVal, fitnessVal, sleepVal, moodVal) {
  chartRadar.data.datasets[0].data.push(foodVal);
  chartRadar.data.datasets[1].data.push(fitnessVal);
  chartRadar.data.datasets[2].data.push(sleepVal);
  chartRadar.data.datasets[3].data.push(moodVal);
  
  chartRadar.update();
}

