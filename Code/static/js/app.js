import { drawMap } from "./usmap.js"
import { drawEbars } from "./hbars.js"
import { drawBoxPlot } from "./boxplot.js"
import { drawLine } from "./lines.js"

drawMap()
drawEbars()
drawBoxPlot()
drawLine()

$("#selYear").on("change", function(){
    drawMap()
    drawEbars()
})

$("#selDataset").on("change", function(){
    drawEbars()
})