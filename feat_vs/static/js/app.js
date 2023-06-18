function barPlot(data)
{
  let barData =
  [
    {
      x:[],
      y:[],
      type:"bar"
    }
  ]

  Plotly.newPlot("bar",barData)
}
// let data = [
//   {
//     x: ["giraffes", "orangutans", "monkeys"],
//     y: [20, 14, 23],
//     type: "bar",
//   },
// ];

// Plotly.newPlot("bar", data);