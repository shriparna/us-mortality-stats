export {drawBoxPlot}

// Draw Box Plot
// Where Y-axis has all the states
// and X-axis is the distribution of annual death rates
function drawBoxPlot()
{
  var dom = document.getElementById('box-plot');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var option;

  // Navigate to Flask endpoint, get and transform data, and draw the box plot
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
        name: 'Distribution of Age-adjusted Death Rates',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle:{
          color:"white",
          fontSize:20
        },
        scale: true,
        axisLabel:{
          color:"white"
        }
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