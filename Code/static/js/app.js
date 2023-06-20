function drawBars()
{
  let state = d3.select("#selDataset").node().value
  let year = d3.select("#selYear").node().value
  console.log(state)
  console.log(year)

  d3.json(`/api/v1.0/bar_data/${state}/${year}`)
  .then(data =>
  {
    let causeArray = []
    let deathArray = []
    for (x of data)
    {
      causeArray.push(x["Cause Name"])
      deathArray.push(x["Age-adjusted Death Rate"])
    }
    console.log(causeArray)
    console.log(deathArray)
    let trace1 =
    {
      x:deathArray,
      y:causeArray,
      type:"bar",
      orientation:"h"
    }

    let barlayout =
    {
      title:`${data[0]["State"]} Age-adjusted Death Rate by Cause Name for ${data[1]["Year"]}`,
      yaxis:
      {
        automargin:true
      }
    }

    let bardata = [trace1]

    Plotly.newPlot("bar",bardata,barlayout)

  })
}

drawBars("Alabama",2017)

function optionChanged(state)
{
  drawBars()
}

function yearChanged(year)
{
  drawBars()
}

function drawEbars()
{
  let state = d3.select("#selDataset").node().value
  let year = d3.select("#selYear").node().value

  d3.json(`/api/v1.0/bar_data/${state}/${year}`)
  .then(data =>
  {
    let causeArray = []
    let deathArray = []
    for (x of data)
    {
      causeArray.push(x["Cause Name"])
      deathArray.push(x["Age-adjusted Death Rate"])
    }
    
  let dom = document.getElementById("chart-container");
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  let app = {}

  let option

  option = {
    xAxis: {
      type: 'category',
      data: causeArray
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: deathArray,
        type: 'bar'
      }
    ]
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option)
  }

  window.addEventListener('resize', myChart.resize)
  })
}

drawEbars()