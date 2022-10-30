var xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var chartLinePlot = document.getElementById('chartLinePlot').getContext('2d');

var chartLinePlot = new Chart("chartLinePlot", {
    type: "line",
  data: {
    labels: xValues,
    datasets: [{
      data: [],
      borderColor: "red",
      fill: false
    },{
      data2: [],
      borderColor: "green",
      fill: false
    },{
      data: [],
      borderColor: "blue",
      fill: false
    },{
      data: [],
      borderColor: "purple",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

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

function addData(foodVal, fitnessVal, sleepVal, moodVal) {
  chartLinePlot.data.datasets[0].data.push(foodVal);
  chartLinePlot.data.datasets[1].data.push(fitnessVal);
  chartLinePlot.data.datasets[2].data.push(sleepVal);
  chartLinePlot.data.datasets[3].data.push(moodVal);  
  
  chartLinePlot.update();
}

function addToRadar(foodVal, fitnessVal, sleepVal, moodVal) {
  chartRadar.data.datasets[0].data.push(foodVal);
  chartRadar.data.datasets[1].data.push(fitnessVal);
  chartRadar.data.datasets[2].data.push(sleepVal);
  chartRadar.data.datasets[3].data.push(moodVal);
  
  chartRadar.update();
}

