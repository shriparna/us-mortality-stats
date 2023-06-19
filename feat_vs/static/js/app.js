d3.json("/api/v1.0/bar_data")
.then(data =>
{
  console.log(data)
  let causeArray = []
  let deathArray = []
  for (x of data)
  {
    causeArray.push(x["Cause Name"])
    deathArray.push(x["Deaths"])
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

  let bardata = [trace1]

  Plotly.newPlot("bar",bardata)

})






// function barPlot(data)
// {
//   let barData =
//   [
//     {
//       x:[],
//       y:[],
//       type:"bar"
//     }
//   ]

//   Plotly.newPlot("bar",barData)
// }
// let data = [
//   {
//     x: ["giraffes", "orangutans", "monkeys"],
//     y: [20, 14, 23],
//     type: "bar",
//   },
// ];

// Plotly.newPlot("bar", data);