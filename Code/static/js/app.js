drawEbars()
drawMap()
drawLine()

function optionChanged(state)
{
  drawEbars()
}

function yearChanged(year)
{
  drawEbars()
  drawMap()
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
    
  let dom = document.getElementById("myDiv2");
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  let app = {}

  let option

  option = {
    title: {
      text:`${data[0]["State"]} - ${data[1]["Year"]}`,
      textAlign:"auto",
      left:"center",
      textStyle:{
        color:"#edf2fb"
      }
    },
    grid:{
      containLabel:true,
      tooltip:{
        axisPointer:{
          label:{
            show:true,
            position:"top"
          }
        }
      }
    },
    tooltip:{
      formatter:"{c}",
      show:true,
      trigger:"axis"
    },
    xAxis: {
      type: 'value',
      name:"Age-adjusted Death Rate",
      nameLocation:"center",
      alignTicks:"true",
      axisLabel:{
        textStyle:{
          color:"#edf2fb"
        }
      }
    },
    yAxis: {
      type: 'category',
      data:causeArray,
      axisTick:{
        alignWithLabel:true
      },
      axisLabel:{
        textStyle:{
          color:"#edf2fb"
        }
      }
    },
    series: [
      {
        data:deathArray,
        type:"bar",
        itemStyle : { normal: {label : {show: true, position: 'right', color:'#FFFFFF'}}}
      }
    ],
    axisTick:{
      lineStyle:{
        color:"white"
      }
    }
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option)
  }

  window.addEventListener('resize', myChart.resize)
  })
}

function drawMap()
{
  let year = d3.select("#selYear").node().value
  let dom = document.getElementById('myDiv');
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  let app = {};
  let option;

  $.getJSON("/api/v1.0/usJSON", function (usaJson) {
    d3.json(`/api/v1.0/mapdata/${year}`).then(mapdata => {
    myChart.hideLoading();
    echarts.registerMap('USA', usaJson, {
      Alaska: {
        left: -131,
        top: 25,
        width: 15
      },
      Hawaii: {
        left: -110,
        top: 28,
        width: 5
      },
      'Puerto Rico': {
        left: -76,
        top: 26,
        width: 2
      }
    });
    option = {
      title: {
        text: `Age-adjusted Death Rates (${year})`,
        subtext: 'Data from www.cdc.gov',
        sublink: 'https://www.cdc.gov/nchs/data-visualization/mortality-leading-causes/index.htm',
        left: 'center',
        textStyle:{
          color:"white"
        }
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      visualMap: {
        left: '90%',
        top: '50%',
        min: 600,
        max: 1000,
        inRange: {
          color: ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"
            // '#313695',
            // '#4575b4',
            // '#74add1',
            // '#abd9e9',
            // '#e0f3f8',
            // '#ffffbf',
            // '#fee090',
            // '#fdae61',
            // '#f46d43',
            // '#d73027',
            // '#a50026'
          ]
        },
        text: ['High', 'Low'],
        calculable: true,
        textStyle:{
          color:"white"
        }
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'USA Deaths',
          type: 'map',
          roam: true,
          map: 'USA',
          emphasis: {
            label: {
              show: true
            }
          },
          data: mapdata
        }
      ]
    };
    myChart.setOption(option);
  });

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
})
}

function drawLine()
{
  d3.json("/api/v1.0/line").then(data=>
  {let xdata = []
  let ydata = []
  for (a of data)
  {
    xdata.push(a.Year)
    ydata.push(a["Age-adjusted Death Rate"])
  }
  var dom = document.getElementById('line');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};

  var option;

  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xdata
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: ydata,
        type: 'line',
        smooth: 'true'
      }
    ]
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
})}