// Initialize page with visuals
drawEbars()
drawMap()
drawLine()
drawBoxPlot()
// drawPlotly()
// barRace()
export {drawMap,drawEbars,drawBoxPlot,drawLine,optionChanged,yearChanged}
// Restart Line Race
function reRace()
{
  d3.select("#line").text("")
  drawLine()
}

// Dropdown for States
// Re-renders Bar Chart and Plotly Line Chart
function optionChanged()
{
  drawEbars()
}

// Dropdown for Years
// Re-renders Bar Chart and Choropleth Map
function yearChanged()
{
  drawEbars()
  drawMap()
}

function drawBoxPlot()
{
  var dom = document.getElementById('box-plot');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var option;

  $.when(
    $.getJSON('/api/v1.0/boxplot'),
    $.getScript(
      'https://fastly.jsdelivr.net/npm/echarts-simple-transform/dist/ecSimpleTransform.min.js'
    )
  ).done(function (res) {
    run(res[0]);
  });
  function run(_rawData) {
    echarts.registerTransform(ecSimpleTransform.aggregate);
    option = {
      dataset: [
        {
          id: 'raw',
          source: _rawData
        },
        {
          id: 'since_year',
          fromDatasetId: 'raw',
          transform: [
            {
              type: 'filter',
              config: {
                dimension: 'Year',
                gte: 1999
              }
            }
          ]
        },
        {
          id: 'income_aggregate',
          fromDatasetId: 'since_year',
          transform: [
            {
              type: 'ecSimpleTransform:aggregate',
              config: {
                resultDimensions: [
                  { name: 'min', from: 'Age-adjusted Death Rate', method: 'min' },
                  { name: 'Q1', from: 'Age-adjusted Death Rate', method: 'Q1' },
                  { name: 'median', from: 'Age-adjusted Death Rate', method: 'median' },
                  { name: 'Q3', from: 'Age-adjusted Death Rate', method: 'Q3' },
                  { name: 'max', from: 'Age-adjusted Death Rate', method: 'max' },
                  { name: 'State', from: 'State' }
                ],
                groupBy: 'State'
              }
            },
            {
              type: 'sort',
              config: {
                dimension: 'Q3',
                order: 'asc'
              }
            }
          ]
        }
      ],
      title: {
        text: 'Death Rates from 1999-2017 (per 100,000 population)',
        textStyle:{
          color:"white"
        }
      },
      tooltip: {
        trigger: 'axis',
        confine: true
      },
      xAxis: {
        name: 'Age-adjusted Death Rate',
        nameLocation: 'middle',
        nameGap: 30,
        scale: true
      },
      yAxis: {
        type: 'category',
        alignTicks:true,
        axisTick:{
          alignWithLabel:true
        },
        axisLabel:{
          fontSize:10,
          color:"white"
        }
      },
      grid: {
        bottom: 100
      },
      legend: {
        selected: { detail: false }
      },
      dataZoom: [
        {
          type: 'inside'
        },
        {
          type: 'slider',
          height: 20
        }
      ],
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          datasetId: 'income_aggregate',
          itemStyle: {
            color: '#b8c5f2'
          },
          encode: {
            x: ['min', 'Q1', 'median', 'Q3', 'max'],
            y: 'State',
            itemName: ['State'],
            tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
          }
        },
        {
          name: 'detail',
          type: 'scatter',
          datasetId: 'since_year',
          symbolSize: 6,
          tooltip: {
            trigger: 'item'
          },
          label: {
            show: true,
            position: 'top',
            align: 'left',
            verticalAlign: 'middle',
            rotate: 90,
            fontSize: 12
          },
          itemStyle: {
            color: '#d00000'
          },
          encode: {
            x: 'Age-adjusted Death Rate',
            y: 'State',
            label: 'Year',
            itemName: 'Year',
            tooltip: ['State', 'Year', 'Age-adjusted Death Rate']
          }
        }
      ]
    };
    myChart.setOption(option);
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
}

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
    for (let x of data)
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
        text:`${data[0]["State"]} Death Rates - ${data[1]["Year"]}\n (per 100,000 population)`,
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
        nameGap:30,
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
        text: `State Death Rates: All Causes - ${year}\n (per 100,000 population)`,
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

// Draw Echarts Racing Bars
function barRace()
{
  var dom = document.getElementById('bar-race');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var option;

  const updateFrequency = 2000;
  const dimension = 0;
  const countryColors = {
    Australia: '#00008b',
    Canada: '#f00',
    China: '#ffde00',
    Cuba: '#002a8f',
    Finland: '#003580',
    France: '#ed2939',
    Germany: '#000',
    Iceland: '#003897',
    India: '#f93',
    Japan: '#bc002d',
    'North Korea': '#024fa2',
    'South Korea': '#000',
    'New Zealand': '#00247d',
    Norway: '#ef2b2d',
    Poland: '#dc143c',
    Russia: '#d52b1e',
    Turkey: '#e30a17',
    'United Kingdom': '#00247d',
    'United States': '#b22234'
  };
  $.when(
    $.getJSON('https://fastly.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
    $.getJSON("/api/v1.0/racing")
  ).done(function (res0, res1) {
    const flags = res0[0];
    const data = res1[0];
    const years = [];
    for (let i = 0; i < data.length; ++i) {
      if (years.length === 0 || years[years.length - 1] !== data[i][2]) {
        years.push(data[i][2]);
      }
    }
    function getFlag(countryName) {
      if (!countryName) {
        return '';
      }
      return (
        flags.find(function (item) {
          return item.name === countryName;
        }) || {}
      ).emoji;
    }
    let startIndex = 10;
    let startYear = years[startIndex];
    option = {
      grid: {
        top: 10,
        bottom: 30,
        left: 150,
        right: 80
      },
      xAxis: {
        max: 'dataMax',
        axisLabel: {
          formatter: function (n) {
            return Math.round(n) + '';
          }
        }
      },
      dataset: {
        source: data.slice(1).filter(function (d) {
          return d[2] === startYear;
        })
      },
      yAxis: {
        type: 'category',
        inverse: true,
        max: 10,
        axisLabel: {
          show: true,
          fontSize: 14,
          formatter: function (value) {
            return value;
          },
          rich: {
            flag: {
              fontSize: 25,
              padding: 5
            }
          }
        },
        animationDuration: 300,
        animationDurationUpdate: 300
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          // itemStyle: {
          //   color: function (param) {
          //     return countryColors[param.value[3]] || '#5470c6';
          //   }
          // },
          encode: {
            x: dimension,
            y: 3
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace'
          }
        }
      ],
      // Disable init animation.
      animationDuration: 0,
      animationDurationUpdate: updateFrequency,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      graphic: {
        elements: [
          {
            type: 'text',
            right: 160,
            bottom: 60,
            style: {
              text: startYear,
              font: 'bolder 80px monospace',
              fill: 'rgba(100, 100, 100, 0.25)'
            },
            z: 100
          }
        ]
      }
    };
    // console.log(option);
    myChart.setOption(option);
    for (let i = startIndex; i < years.length - 1; ++i) {
      (function (i) {
        setTimeout(function () {
          updateYear(years[i + 1]);
        }, (i - startIndex) * updateFrequency);
      })(i);
    }
    function updateYear(year) {
      let source = data.slice(1).filter(function (d) {
        return d[2] === year;
      });
      option.series[0].data = source;
      option.graphic.elements[0].style.text = year;
      myChart.setOption(option);
    }
  });

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
}

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
      animationDuration: 7000,
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData
        },
        ...datasetWithFilters
      ],
      title: {
        text: 'US Death Rates from 1999 to 2017 (per 100,000 population)',
        left:"center",
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
        name: 'Years',
        nameTextStyle:{
          color:"white",
          fontSize:20
        },
        nameLocation: 'middle',
        nameGap:50,
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
          color:"white",
          fontSize:20
        },
        axisLabel:{
          color:"white"
        },
        // type:'log'
      },
      grid: {
        right: 200
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