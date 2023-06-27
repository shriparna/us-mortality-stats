// Import chart functions
import { drawMap } from "./usmap.js"
import { drawEbars } from "./hbars.js"
import { drawBoxPlot } from "./boxplot.js"
import { drawLine } from "./lines.js"

// Render charts
drawMap()
drawEbars()
drawBoxPlot()
drawLine()

// Re-render Map and Bar Chart
// when a new Year is selected from dropdown
$("#selYear").on("change", function(){
    drawMap()
    drawEbars()
})

// Re-render Bar Chart
// when a new State is selected from dropdown
$("#selDataset").on("change", function(){
    drawEbars()
})