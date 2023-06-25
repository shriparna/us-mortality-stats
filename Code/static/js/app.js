// Initialize page with visuals
drawEbars()
drawMap()
drawLine()
drawPlotly()

// Dropdown for States
function optionChanged(state)
{
  drawEbars()
  drawPlotly()
}

// Dropdown for Years
function yearChanged(year)
{
  drawEbars()
  drawMap()
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// Draw Echarts Horizontal Bar Chart
function drawEbars()
{
  // Get values from dropdowns
  let state = d3.select("#selDataset").node().value
  let year = d3.select("#selYear").node().value

  // Navigate to Flask endpoint, get data, and draw chart
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
        left:"50%",
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
        nameGap:50,
        nameTextStyle:{
          color:"white",
          fontSize:20
        },
        alignTicks:"true",
        axisLabel:{
          textStyle:{
            color:"#edf2fb"
          }
        }
      },
      yAxis: {
        type: 'category',
        name:"Cause of Death",
        nameLocation:"end",
        nameTextStyle:{
          color:"white",
          fontSize:15,
          align:"right"
        },
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
          itemStyle : { color:"#0A9396"
          // "white"
        },
          label : {show: true, position:'right',color:'white'}
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

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// Draw Choropleth Map
function drawMap()
{
  // Get Year from dropdown
  let year = d3.select("#selYear").node().value
  
  let dom = document.getElementById('myDiv');
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  let app = {};
  let option;

  // Get US States Polygon Coordinates
  $.getJSON("/api/v1.0/usJSON", function (usaJson) {
    
    // Navigate to Flask endpoint, get data, and draw Map 
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
        text: `Age-adjusted Death Rates from All Causes (${year})`,
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
          color: [
            "#001219",
            "#005f73",
            "#0a9396",
            "#94d2bd",
            "#e9d8a6",
            "#ee9b00",
            "#ca6702",
            "#bb3e03",
            "#ae2012",
            "#9b2226"
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
            },
            focus:"self"
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

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// Draw Plotly Line Graph
function drawPlotly()
{
  // Get State from dropdown
  let state = d3.select("#selDataset").node().value

  // Navigate to Flask endpoint, get data, and draw chart 
  d3.json(`/api/v1.0/line/${state}`).then(data=>
  {let xdata = []
  let ydata = []
  for (a of data)
  {
    xdata.push(a.Year)
    ydata.push(a["Age-adjusted Death Rate"])
  }
  let trace1 = {
    x: xdata,
    y: ydata,
    type: 'line'
  }
  let layout = {
    title: {
      text: `Age-adjusted Death Rate for ${state}`,
      font: {
        color: "white"
      }
    },
    paper_bgcolor: '#1D1D1D',
    plot_bgcolor: '#1D1D1D',
    xaxis: {
      title: {
        text: 'Years',
        font: {
          color: 'white'
        }
      },
      tickfont: {
        color: 'white'
      }
    },
    yaxis: {
      title: {
        text: 'Death Rate',
        font: {
          color: 'red'
        }
      },
      gridcolor: 'white',
      gridwidth: 0.01,
      tickfont: {
        color: 'white'
      }
    }    
  }
  
  let data1 = [trace1];
  
  Plotly.newPlot('chart-container', data1, layout);
})}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// Draw Echarts Racing Lines
function drawLine()
{
  var dom = document.getElementById('line');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var option;

  // Navigate to Flask endpoint, get data, and draw chart 
  $.getJSON('/api/v1.0/racing', function (_rawData) {
      run(_rawData);
    }
  );
  function run(_rawData) {
    
    const causes = [
      "Unintentional injuries",
      "Alzheimer's disease",
      "Stroke",
      "CLRD",
      "Diabetes",
      "Heart disease",
      "Influenza and pneumonia",
      "Suicide",
      "Cancer",
      "Kidney disease"
    ];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(causes, function (country) {
      var datasetId = 'dataset_' + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1999 },
              { dimension: 'Cause Name', '=': country }
            ]
          }
        }
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
          color:"white",
          formatter: function (params) {
            return params.value[1] + ': ' + params.value[0];
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Year',
          y: 'Age-adjusted Death Rate',
          label: ['Cause Name', 'Age-adjusted Death Rate'],
          itemName: 'Year',
          tooltip: ['Age-adjusted Death Rate']
        }
      });
    });
    option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData
        },
        ...datasetWithFilters
      ],
      title: {
        text: 'US Age-adjusted Death Rates from 1999 to 2017',
        textStyle:{
          color:"white"
        }
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
        axisLabel:{
          color:"white"
        },
        axisTick:{
          alignWithLabel:true
        }
      },
      yAxis: {
        name: 'Age-adjusted Death Rate',
        nameTextStyle:{
          color:"white"
        },
        axisLabel:{
          color:"white"
        },
        // type:'log'
      },
      grid: {
        right: 140
      },
      series: seriesList
    };
    myChart.setOption(option);
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
}