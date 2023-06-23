function optionChanged(state)
{
  drawEbars()
}

function yearChanged(year)
{
  drawEbars()
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
    title: {
      text:`${data[0]["State"]} Age-adjusted Death Rate by Cause Name for ${data[1]["Year"]}`,
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

drawEbars()

var dom = document.getElementById('myDiv');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};
// var ROOT_PATH = 'https://echarts.apache.org/examples';
var option;

myChart.showLoading();
$.getJSON("/api/v1.0/usJSON", function (usaJson) {
  d3.json("/api/v1.0/mapdata").then(mapdata => {
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
      text: 'USA Death Statistics (2017)',
      subtext: 'Data from /www.cdc.gov',
      sublink: 'https://www.cdc.gov/nchs/data-visualization/mortality-leading-causes/index.htm',
      left: 'right'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'right',
      min: 4000,
      max: 270000,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      },
      text: ['High', 'Low'],
      calculable: true
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
        // data: [
        //   { name: 'Alabama', value: 4822023 },
        //   { name: 'Alaska', value: 731449 },
        //   { name: 'Arizona', value: 6553255 },
        //   { name: 'Arkansas', value: 2949131 },
        //   { name: 'California', value: 38041430 },
        //   { name: 'Colorado', value: 5187582 },
        //   { name: 'Connecticut', value: 3590347 },
        //   { name: 'Delaware', value: 917092 },
        //   { name: 'District of Columbia', value: 632323 },
        //   { name: 'Florida', value: 19317568 },
        //   { name: 'Georgia', value: 9919945 },
        //   { name: 'Hawaii', value: 1392313 },
        //   { name: 'Idaho', value: 1595728 },
        //   { name: 'Illinois', value: 12875255 },
        //   { name: 'Indiana', value: 6537334 },
        //   { name: 'Iowa', value: 3074186 },
        //   { name: 'Kansas', value: 2885905 },
        //   { name: 'Kentucky', value: 4380415 },
        //   { name: 'Louisiana', value: 4601893 },
        //   { name: 'Maine', value: 1329192 },
        //   { name: 'Maryland', value: 5884563 },
        //   { name: 'Massachusetts', value: 6646144 },
        //   { name: 'Michigan', value: 9883360 },
        //   { name: 'Minnesota', value: 5379139 },
        //   { name: 'Mississippi', value: 2984926 },
        //   { name: 'Missouri', value: 6021988 },
        //   { name: 'Montana', value: 1005141 },
        //   { name: 'Nebraska', value: 1855525 },
        //   { name: 'Nevada', value: 2758931 },
        //   { name: 'New Hampshire', value: 1320718 },
        //   { name: 'New Jersey', value: 8864590 },
        //   { name: 'New Mexico', value: 2085538 },
        //   { name: 'New York', value: 19570261 },
        //   { name: 'North Carolina', value: 9752073 },
        //   { name: 'North Dakota', value: 699628 },
        //   { name: 'Ohio', value: 11544225 },
        //   { name: 'Oklahoma', value: 3814820 },
        //   { name: 'Oregon', value: 3899353 },
        //   { name: 'Pennsylvania', value: 12763536 },
        //   { name: 'Rhode Island', value: 1050292 },
        //   { name: 'South Carolina', value: 4723723 },
        //   { name: 'South Dakota', value: 833354 },
        //   { name: 'Tennessee', value: 6456243 },
        //   { name: 'Texas', value: 26059203 },
        //   { name: 'Utah', value: 2855287 },
        //   { name: 'Vermont', value: 626011 },
        //   { name: 'Virginia', value: 8185867 },
        //   { name: 'Washington', value: 6897012 },
        //   { name: 'West Virginia', value: 1855413 },
        //   { name: 'Wisconsin', value: 5726398 },
        //   { name: 'Wyoming', value: 576412 },
        //   { name: 'Puerto Rico', value: 3667084 }
        // ]
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

// d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv')
// .then(data=>
// {
// let states = []
// data.map(x=>states.push(x.code))
// console.log(states)

// let exports = []
// data.map(x=>exports.push(x["total exports"]))
// console.log(exports)

// let stateNames = []
// data.map(x=>stateNames.push(x.state))
// console.log(stateNames)

// var data = [{
//     type: 'choropleth',
//     locationmode: 'USA-states',
//     locations: states,
//     z: exports,
//     text: stateNames,
//     zmin: 0,
//     zmax: 17000,
//     colorscale: [
//         [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
//         [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
//         [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
//     ],
//     colorbar: {
//         title: 'Millions USD',
//         thickness: 20
//     },
//     marker: {
//         line:{
//             color: 'rgb(255,255,255)',
//             width: 2
//         }
//     }
// }];


// var layout = {
//     title: '2011 US Agriculture Exports by State',
//     geo:{
//         scope: 'usa',
//         showlakes: true,
//         lakecolor: 'rgb(255,255,255)'
//     }
// };

// Plotly.newPlot("myDiv", data, layout, {showLink: false});
// })
d3.json("/api/v1.0/mapdata").then(data=>console.log(data))