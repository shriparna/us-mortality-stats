export {drawEbars}

// Draw Horizontal Bar Chart
// where Y-axis is Cause of Death
// and X-axis is Death Rate
function drawEbars()
{
  // Get State and Year from dropdowns
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