export {drawLine}

// Draw Racing Lines Chart
// where Y-axis is the Death Rate
// and X-axis is the Year
// and each line is a different cause of death
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