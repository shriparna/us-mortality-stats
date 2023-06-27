export {drawMap}

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