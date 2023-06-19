d3.json("/api/v1.0/states_list")
.then(data =>
{
  for (x of data)
  {
    d3.select("#selDataset")
    .append("option")
    .attr("value",x)
    .text(x)
  }
})

function drawBars()
{
  d3.json("/api/v1.0/bar_data")
  .then(data =>
  {
    console.log(data)
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
      title:`${data[0]["State"]} Age-adjusted Death Rate by Cause Name`,
      yaxis:
      {
        automargin:true
      }
    }

    let bardata = [trace1]

    Plotly.newPlot("bar",bardata,barlayout)

  })
}

drawBars()

function optionChanged()
{
  drawBars()
}