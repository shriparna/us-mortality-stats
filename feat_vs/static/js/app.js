d3.select("#choose_state")
.append("form")
.attr("action","/api/v1.0/index/")
.attr("method","POST")

d3.select("form")
.append("select")
.attr("id","selDataset")

for (x of states_list)
{
  d3.select("#selDataset").append("option").attr("value","please work").text(x)
}






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