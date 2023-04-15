const labelGraphCol = "white";
const gridLinesCol = "#888787";
const input = document.getElementById('timerMax')
const input2 = document.getElementById('lenMax')

window.api.receive("fromMainServerDown", (data) => {
  myCheckbox.checked=false
});

function loadAllDataNew(){
  dataForGraphsT(undefined, undefined, "s", true, true)
}


/* ----------------------------------------- lin chart init ----------------------------------------- */
const Lchart = document.getElementById('myChart')
const labelsL = [];
const configL = {
  type: 'line',
  data: {
    labels: labelsL,
    datasets: [
      {
          label: '',
          borderColor: '#ff0000',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          data: [0, 1, 2],
          fill: false,
          borderWidth: 0,
          spanGaps: true,
          tension: 0.1,
          color:labelGraphCol
      }
      ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display:true,
        text:'Legend',
        color: labelGraphCol,
        fontColor:labelGraphCol,
        labels:{
          color: labelGraphCol,
          usePointStyle: true,
          pointStyle: 'circle'
        },
        onHover: function(event, chartElement) {
          document.body.style.cursor = 'pointer';
        },
        onLeave: function(event, chartElement) {
          document.body.style.cursor = 'default';
        }
      },
      title: {
        display: true,
        text: 'Responses',
        color: labelGraphCol
      },
      zoom:{
        zoom:{
          drag:{
            enabled:true
          },
          mode:'x'
        },
      },
      
    },
    scales:{
          y:{
              suggestedMax:5,
              beginAtZero: true,
              title:{
                  display: true,
                  text:'Ping [ms]',
                  color: labelGraphCol,
              },
              ticks: {
                color:labelGraphCol,
              },
              min: -1.5,
              grid: {
                color: gridLinesCol
              }
          },
          x:{
            title:{
                display: true,
                text:'Time [h/m/s]',
                color:"white",
            },
            ticks:{
              color:"white",
              maxRotation: 90,
              minRotation: 0,
              callback: function(label) {
                let realLabel = this.getLabelForValue(label)
                return realLabel[0];
              }
            },
            grid: {
              color: gridLinesCol
            }
          },
          xAxis2: {
            type: "category",
            title:{
              display: true,
              text:'Time [Y/M/D]',
              color:"white",
            },
            ticks:{
              color: labelGraphCol,
              maxRotation: 90,
              minRotation: 40,
              callback: function(label) {
                let realLabel = this.getLabelForValue(label)
                if (realLabel[1] != "") {
                  return realLabel[1];
                }
              }
            },
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
              color: gridLinesCol
            }

          },
    },
    legend: {
      labels: {
          fontColor: 'white'
      }
    },
    legend: {
      color: labelGraphCol
    }
  },
};//config grafu


var myChart = new Chart(Lchart, configL);


//butons
const load_d = document.getElementById('load_d') 
load_d.addEventListener('click', async () => {
  myCheckbox.checked=true
  dataForGraphsT(undefined, undefined, "s", true, true)
})

const resZ = document.getElementById('resetZoom')
resZ.addEventListener('click', ()=>{
  myChart.resetZoom()
})

const lm = document.getElementById('left_m')
lm.addEventListener('click', ()=>{
  myChart.pan({x: 100}, undefined, 'default');
})

const rm = document.getElementById('right_m')
rm.addEventListener('click', ()=>{
  myChart.pan({x: -100}, undefined, 'default');
})

/* ----------------------------------------- barr chart init ----------------------------------------- */

const Bchart = document.getElementById('myBarChart')
const labelsB = [""];

const dataB = {
  labels: labelsB,
  datasets: [
    {
      label: "Passed",
      backgroundColor: ["#3e95cd"],
      data: [0],
      color:labelGraphCol
    },
    {
      label: "Failed",
      backgroundColor: ["#c45850"],
      data: [0],
      color:labelGraphCol
    }
  ]
};

const configB = {
  type: 'bar',
  data: dataB,
  options: {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    scales:{
      y:{
        ticks:{
          color:labelGraphCol
        },
        grid: {
          color: gridLinesCol
        }
      },
      x:{
        ticks:{
          color:labelGraphCol
        },
        grid: {
          color: gridLinesCol
        }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true, 
          pointStyle: 'circle' 
        }
      },
      datalabels: {
          color: 'white'
      },
      title: {
        display: true,
        text: 'Error graphs',
        color: labelGraphCol
      },
    },
    color:"white"
  },
};

var myBarChart = new Chart(Bchart, configB);



/* ----------------------------------------- polar init ----------------------------------------- */

const dataP = {
  labels: [''],
  datasets: [{
    label: 'My First Dataset',
    data: [5],
    backgroundColor: ['rgba(255, 99, 132, 1)'],
    borderColor: 'rgba(255, 99, 132, 0)',
  }]
};

const configP = {
  type: 'polarArea',
  data: dataP,
  options: {
    plugins: {
      legend: {
        position: 'bottom',
        display:true,
        color: labelGraphCol,
        fontColor: labelGraphCol,
        labels:{
          color: labelGraphCol,
          usePointStyle: true,
          pointStyle: 'circle'
        },
        onHover: function(event, chartElement) {
          document.body.style.cursor = 'pointer';
        },
        onLeave: function(event, chartElement) {
          document.body.style.cursor = 'default';
        }
      },
      title: {
        display: true,
        text: 'Average responses',
        color: labelGraphCol
      },
    },
    scale: {
      ticks: {
          beginAtZero: false,
          stepSize: 2
      }
    }
  }
};
const Pchart = document.getElementById('myPolarChart')
var myPolarChart = new Chart(Pchart, configP);


/* ----------------------------------------- doughnut init ----------------------------------------- */ 

const dataD = {
  labels: [],
  datasets: [{
    label: 'My First Dataset',
    data: [],
    backgroundColor: [],
    borderColor: 'rgba(255, 99, 132, 0)',
    hoverOffset: 4
  }]
};

const configD = {
  type: 'doughnut',
  data: dataD,
  options: {
    plugins: {
      legend: {
        position: 'bottom',
        display:true,
        color: labelGraphCol,
        fontColor: labelGraphCol,
        labels:{
          color: labelGraphCol,
          usePointStyle: true,
          pointStyle: 'circle' 
        },
        onHover: function(event, chartElement) {
          document.body.style.cursor = 'pointer';
        },
        onLeave: function(event, chartElement) {
          document.body.style.cursor = 'default';
        }
      },
      title: {
        display: true,
        text: 'Counts of measured values',
        color: labelGraphCol
      },
    }
  }
};

const Dchart = document.getElementById('myDoughnutChart')
var myDoughnutChart = new Chart(Dchart, configD);

/* ----------------------------------------- init loading ----------------------------------------- */ 
var refreshTime = 60
var lenLimit = 300


var initAutoReload = false; //start auto reload only on first load
var sett 
function loadTableData(){
  window.api.send("toMainSettings")//načítá nastavení a všechna data
  window.api.receive("fromMainSettings", (sett) => {
    refreshTime = sett.secsForGraphUpdate
    lenLimit = sett.graphValueCount
    
    input.value = refreshTime
    input2.value = lenLimit
    
    myCheckbox.checked=true
    dataForGraphsT(undefined, undefined, "s", true, true)
    if (!initAutoReload){
      autoReload()
      initAutoReload = true;
    }

  })
}

/* ----------------------------------------- auto reload ----------------------------------------- */ 


let lastTime = 0
const myCheckbox = document.getElementById('myCheckbox');

function autoReload(){
  
  t = refreshTime

    timer = document.getElementById('timer')
    
    setInterval(function(){ // renew every sec
      myCheckbox.checked==true?--t:""
      if (t==2){
        timer.innerText = "Refresh: " + t + " s"
        if (myBarChart.data.labels.length>1){
          dataForGraphsT(lastLoadedTime+1, undefined, "s", false, true)
        }else{
          dataForGraphsT(undefined, undefined, "s", true, true)
        }
        console.log(myChart.data)
        --t
      }
      if (t==1){
        
        t=refreshTime
      }else{
        timer.innerText = "Refresh: " + t + " s"
      }
    }, 1000);//1000
}



var YMDprews = ''

function clearDataFromGraphs(){

  myChart.data.labels = []
  myChart.data.datasets = []
  myChart.data.labelTimestamp = []

  myBarChart.data.labels = []

  myPolarChart.data.labels = []

  myDoughnutChart.data.labels = []
}


/* ----------------------------------------- data in interval load ----------------------------------------- */ 

const startInput = document.getElementById('start-time');
const endInput = document.getElementById('end-time');

const startTime = Date.parse(startInput.value);
const endTime = Date.parse(endInput.value);
const dropdownM = document.getElementById("myDropdownM");


//butons
const loadFromTo = document.getElementById('loadFromTo') 
loadFromTo.addEventListener('click', async () => {
  myCheckbox.checked=false
  const startTime = Date.parse(startInput.value);
  const endTime = Date.parse(endInput.value);
  const selectedOption = dropdownM.options[dropdownM.selectedIndex].value;

  dataForGraphsT(startInput.value==""?undefined:startTime, endInput.value==""?undefined:endTime, selectedOption, true, false)
})



var lastLoadedTime = 0
var lastLoadedTimeAuto = ""

function timeConvT(time, roundingUnit){

  time = new Date(time)

  var [year, month, day, hour, minute, second] = [time.getFullYear(), (time.getMonth()+1), time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()]//YMDhms

  switch (roundingUnit) {
    case 's':
      newTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
      newDate = `${year.toString()}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      break;
    case 'm':
      newTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
      newDate = `${year.toString()}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      break;  
    case 'h':
      newTime = `${hour.toString().padStart(2, "0")}:00:00`;
      newDate = `${year.toString()}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      break;
    case 'D':
      newTime = "00:00:00"
      newDate = `${year.toString()}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      break;
    case 'M':
      newTime = "00:00:00"
      newDate = `${year.toString()}-${month.toString().padStart(2, "0")}-00`;
      break;
    case 'Y':
      newTime = "00:00:00"
      newDate = `${year.toString()}-00-00`;
      break;
  }

  var returnedTime = {"YMD":newDate, "hms":newTime}
  return returnedTime
}

const twoDaysAgo = new Date();
timestapm2dayago = twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);
var statusBar = document.getElementById("progress");
function progress(progressStatus){
  document.getElementById("myBar").style.width = progressStatus + "%";
}



function dataForGraphsT(dtf = 0, dtt=Date.now(), step = "s", firsLoad = true, auto = true){//write to line graph and get data for other graphs setting it to json from first graph
  var chartData = [], labels = [], newWal = true, i = 0, stts = 0
  ttt = Date.now()
  statusBar.style.height = "17%"
  progress(stts+=10);
  console.log((Date.now() - ttt), ttt = Date.now())
  if (firsLoad){lastLoadedTime = 0}
  window.api.httpRequest("requestLoadAll", {params:{'time_from':dtf,'time_to':dtt}})//načítá data od posledního času a přepisuje (TODO) časy
  window.api.receive("fromMainRequestLoadAll", (allRespInterv) => {
    progress(stts+=10)
    if (allRespInterv == "errorFlag")
    {
      console.log("errorFla")
      myCheckbox.checked=false
      statusBar.style.height = "0px"
      return
    }
    console.log((Date.now() - ttt), ttt = Date.now())
    window.api.httpRequest("requestTasksProperties",{ params: {worker:"default"}})
    window.api.receive("fromMainRequestTaskProperties", (taskSpecs) => {
      console.log((Date.now() - ttt), ttt = Date.now())
      var stepts = 50/taskSpecs.length
      taskSpecs.filter(element => element.hide == false).forEach(element => {
            
            chartData.push({
              "address":element.address,
              "failed":0,
              "passed":0,
              "average":0,
              "dataMed":[],
              label:element.name, 
              borderColor: element.color,
              backgroundColor: 'black',
              data:[],
              color:labelGraphCol,
              fill: false,
              borderWidth: 2,
              spanGaps: true,
              tension: 0.1,
            })
            progress(stts+=stepts)
        });

        if (auto){var tprev = lastLoadedTimeAuto}else{var tprev = {"YMD":"", "hms":""}}
        var stepts = 30/allRespInterv.data.length
        allRespInterv.data.forEach(da => {
          //kl = chartData.findIndex(function(item, i){return item.address == da.address})
            lastLoadedTime = da.time
            var time = timeConvT(da.time, step)//YMDhms

            var newLabel = true
            if (time.YMD != tprev.YMD) {
              //console.log([time.hms, time.YMD])
              labels.push([time.hms, time.YMD])
            }
            else if (time.hms != tprev.hms) {
              //console.log([time.hms])
              labels.push([time.hms])
            }
            else {
              //console.log("aaaaaaa")
              newLabel = false
            }
            tprev = time
            lastLoadedTimeAuto = {"YMD":time.YMD, "hms":time.hms}
            
            if (newLabel){
              chartData.forEach(element => {
                if (!newWal) {
                  //console.log(sumNumbersT(element.dataMed), i++, labels[labels.length-2], element.address)
                  element.data.push(sumNumbersT(element.dataMed))
                  element.dataMed = []
                }

                if (element.address==da.address){
                  //element.data.push(da.value)
                  element.dataMed.push(da.value)
                  da.value == -1 ? element.failed++:element.passed++;
                }
                else{
                  //element.data.push(NaN)
                  element.dataMed.push(NaN)
                }

              });
              if (newWal){
                newWal = false
              }
            }
            else{
              chartData.forEach(element => {
                if (element.address==da.address){
                  element.dataMed.push(da.value)
                  //var posAvr = myChart.data.labelTimestamp.findIndex(function(item, i){return item == Math.floor(da.time/1000)})
                  //element.data[element.data.length-1] = da.value
                  da.value == -1 ? element.failed++:element.passed++;
                }
              });
            }
            progress(stts+=stepts)
        });

        chartData.forEach(element => {
          //console.log(sumNumbersT(element.dataMed), i++, labels[labels.length-1], element.address)
          element.data.push(sumNumbersT(element.dataMed))
          element.dataMed = []
          element.average = sumNumbersT(element.data)
        });
        console.log((Date.now() - ttt), ttt = Date.now())
        //console.log(lastLoadedTime, lastLoadedTimeAuto)
        console.log(firsLoad, chartData, labels, auto);   
        setAndUpdateT(firsLoad, chartData, labels, auto);
        console.log((Date.now() - ttt), ttt = Date.now())
        progress(100)
        setTimeout(function() {
          statusBar.style.height = "0px"
        }, 700);
    })
  })
  
}

function sumNumbersT(numbers) {//summ numbers and count average 
  let sum = 0;
  let nonNaN = 0
  numbers.forEach(function(num) {
    if (!isNaN(num)) {
      sum += num;
      nonNaN++
    }
  });
  
  return nonNaN>0?sum/nonNaN:NaN;
}

async function setAndUpdateT(firstSett, data, labels, auto){
  //const nanArray = Array(myChart.data.labels.length).fill(NaN);
  //console.log(nanArray, auto)

  var L_datasets = myChart.data.datasets
  var L_labels = myChart.data.labels
  
  var B_failed = myBarChart.data.datasets[1].data
  var B_passed = myBarChart.data.datasets[0].data

  var P_data = myPolarChart.data.datasets.data
  var P_color = myPolarChart.data.datasets.backgroundColor
  
  var D_data = myDoughnutChart.data.datasets[0].data
  var D_color = myDoughnutChart.data.datasets[0].backgroundColor
    
    
  if (firstSett){//load labels if first sett label for line chart is in datasets
    var L_datasets = [],B_failed = [],B_passed = [],P_data = [],P_color = [],D_data = [],D_color = [],L_labels = []

    clearDataFromGraphs()
    data.forEach(element => {
      myBarChart.data.labels.push(element.label)
      myPolarChart.data.labels.push(element.label)
      myDoughnutChart.data.labels.push(element.label)

      L_datasets.push(element)

      B_failed.push(element.failed)
      B_passed.push(element.passed)
    
      
      dcol = element.borderColor
      P_color.push('rgba('+parseInt(dcol[1]+dcol[2], 16)+","+parseInt(dcol[3]+dcol[4], 16)+","+parseInt(dcol[5]+dcol[6], 16)+',0.7)')
      P_data.push(element.average)
  
      
      D_color.push('rgba('+parseInt(dcol[1]+dcol[2], 16)+","+parseInt(dcol[3]+dcol[4], 16)+","+parseInt(dcol[5]+dcol[6], 16)+',1)')
      D_data.push(element.passed)
    });
    L_labels = labels
  }
  else{
    D_color = [], P_color = []
    data.forEach(element => {
      //console.log(element)
      //console.log("asdfsadfsdafsadfsdafsdafsda", L_datasets.findIndex(function(item, i){return item.address == element.address}))
      index = L_datasets.findIndex(function(item, i){return item.address == element.address})
      //console.log(index,L_datasets[index].data)
      if (index!=-1){
        L_datasets[index].data = L_datasets[index].data.concat(element.data)

        B_failed[index] = B_failed[index]+element.failed
        B_passed[index] = B_passed[index]+element.passed

        dcol = element.borderColor
        P_color[index] = 'rgba('+parseInt(dcol[1]+dcol[2], 16)+","+parseInt(dcol[3]+dcol[4], 16)+","+parseInt(dcol[5]+dcol[6], 16)+',0.7)'

        
        P_data[index] = sumNumbersT([P_data[index], element.average])
        
        D_color[index] = 'rgba('+parseInt(dcol[1]+dcol[2], 16)+","+parseInt(dcol[3]+dcol[4], 16)+","+parseInt(dcol[5]+dcol[6], 16)+',1)'
        D_data[index] = D_data[index] + element.passed

      }
    });
    L_labels = L_labels.concat(labels)
  }

  if (auto){
    trim = L_labels.length<lenLimit?0:L_labels.length-lenLimit
    L_datasets.forEach(element => {
      //console.log(element.data.length<lenLimit?0:-(lenLimit-element.data.length))
      
      element.data.splice(0, trim)

    });
    L_labels.splice(0, trim)
    console.log("%c  Trimmed count: "+ trim +" values is hidden. \n  Graph limit: "+myChart.data.labels.length+"/"+lenLimit, 'color:yellow')
  }

  console.log("labels and data",[L_labels, L_datasets])

  myChart.data.datasets = L_datasets
  myChart.data.labels = L_labels
  
  myChart.update()

  //myBarChart.data.labels =  myBarChart.data.labels
  myBarChart.data.datasets[0].data = B_passed
  myBarChart.data.datasets[1].data = B_failed
  myBarChart.update()

  //myPolarChart.data.labels =  myPolarChart.data.labels
  myPolarChart.data.datasets =  [{
    backgroundColor: P_color,
    borderColor: 'rgba(255, 99, 132, 0)',
    data: P_data}]

  myPolarChart.data.datasets.backgroundColor = P_color
  myPolarChart.data.datasets.data = P_data

  myPolarChart.update()

  myDoughnutChart.data.datasets =[{
    backgroundColor: D_color,
    borderColor: 'rgba(255, 99, 132, 0)',
    data: D_data
  }]

  myDoughnutChart.update()
  
  //console.log(labels, L_datasets)
  //console.log(myBarChart.data.labels, B_passed, B_failed)
  //console.log(myPolarChart.data.labels, P_color, P_data)
  //console.log(myDoughnutChart.data.labels, D_color, D_data, myDoughnutChart.data.datasets[0].backgroundColor)
}


window.api.send("toMainSettings")//načítá nastavení a všechna data
window.api.receive("fromMainSettings", (sett) => {
  dev = sett.dev//set if app is in dev mode
  if (dev){
      chartDataDD = [
        {
            "address": "google.com",
            "failed": 15,
            "passed": 3496,
            "average": 6.504398491001565,
            "dataMed": [],
            "label": "GOG",
            "borderColor": "#b6c309",
            "backgroundColor": "black",
            "data": [
                9.808219178082192,
                9.881889763779528,
                8.892045454545455,
                9.794444444444444,
                9.7
            ],
            "color": "white",
            "fill": false,
            "borderWidth": 2,
            "spanGaps": true,
            "tension": 0.1
        },
        {
            "address": "palaceskateboards.com",
            "failed": 33,
            "passed": 3404,
            "average": 24.436297142045223,
            "dataMed": [],
            "label": "Palace",
            "borderColor": "#fb00ff",
            "backgroundColor": "black",
            "data": [
                24.166666666666668,
                22.173333333333332,
                21.522222222222222,
                22.211111111111112,
                23.322222222222223
            ],
            "color": "white",
            "fill": false,
            "borderWidth": 2,
            "spanGaps": true,
            "tension": 0.1
        }
    ]
    labelsDD = [
      [
          "00:00:00",
          "2023-03-05"
      ],
      [
          "00:00:00",
          "2023-03-06"
      ],
      [
          "00:00:00",
          "2023-03-07"
      ],
      [
          "00:00:00",
          "2023-03-08"
      ],
      [
          "00:00:00",
          "2023-03-09"
      ]
    ]
    setAndUpdateT(true, chartDataDD, labelsDD, false);
  }
})


//menu settings

const menuButtonG = document.getElementById('menuButton-G');
const menuG = document.getElementById('menu-G');
menuButtonG.addEventListener('click', (event) => {
  const clickX = event.clientX-300;
  const clickY = event.clientY+20;

  menuG.style.top = `${clickY}px`;
  menuG.style.left = `${clickX}px`;

  menuG.style.height = "190px";
});

const hideMenuBtnG = document.getElementById('hide-menu-btn-G');
hideMenuBtnG.addEventListener('click', () => {
  menuG.style.height = "0px";
});

const confirmNewval = document.getElementById('confirmNewsettGraph');
confirmNewval.addEventListener('click', () => {
  console.log(input, "to je input")
  if (input.value < 20) {
    alert(input.value + " is too low for refresh");
  } else if (input2.value < 2) {
    alert(input2.value + " is too low for graphs");
  } else {
    refreshTime = input.value;
    lenLimit = input2.value;
    menuG.style.height = "0px";
  }

});

document.body.addEventListener("click", function(event) {
  if (!menuG.contains(event.target) && event.target != menuButtonG){
    menuG.style.height = "0px";
  }
});
