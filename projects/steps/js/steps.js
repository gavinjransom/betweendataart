// Import modules
import data from '../data/steps.json'
import * as d3 from 'd3';

// Console Log to see data
// console.log(data);

data.forEach(d => {
d.date = new Date(d.date);
})

// Milestones Data ---------------------------------------------------------------------
const milestones = 
[{
id: "100k-day",
title: "100k Step Day",
date: "2024-06-21",
// value: 644921,
value: 610000,

type: "point"
},
{
id: "halfway",
title: "Half Way",
date: "2024-05-31",
value: 419024,
type: "milestone"
},
{
id: "five-million",
title: "5 Million Reached!",
date: "2024-11-12",
value: 659399,
type: "milestone"
},
{
id: "final",
title: "Final Count",
date: "2024-12-31",
value:571039,
type: "milestone"
}];

// SVG Dimensions ---------------------------------------------------------------------
const width = 800;
const height = 400;
const margin = {
top: 50,
right: 50,
bottom: 50,
left: 50
};

const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

const topGridLine = 8500000;

// Milestones Data ---------------------------------------------------------------------
d3.select(".milestones-list")
.selectAll(".milestone")
.data(milestones)
.enter()
.append("div")
.attr("class", "milestone")
.text(d => d.title)
.on("mouseover", (event, d) => {
if (d.type === "milestone") {
const x = xScale(new Date(d.date));
svg.append("line")
.attr("class", "test-line")
.attr("x1", x)
.attr("x2", x)
.attr("y1", yScale(topGridLine))
.attr("y2", yScale(0))
// .attr("stroke", "#d4af37")
.attr("stroke", "#5f7a61")

.attr("stroke-width", 3)
.attr("opacity", 0.75);
}
if (d.type === "point") {
const x = xScale(new Date(d.date));
svg.append("circle")
.attr("class", "test-circle")
.attr("cx", x)
.attr("cy", yScale(d.value))
.attr("r", 35)
.attr("stroke", "#c9a86a")
.attr("fill", "none")
.attr("stroke-width", 1);
}
})
.on("mouseout", () => {
svg.selectAll(".test-line").remove();
svg.selectAll(".test-circle").remove();
});

// Append SVG ---------------------------------------------------------------------
const svg = d3.select(".steps")
.append("svg")
.attr("width", width)
.attr("height", height)

// Line Glow ---------------------------------------------------------------------
const defs = svg.append("defs");
const glow = defs.append("filter")
.attr("id", "glow");

glow.append("feGaussianBlur")
.attr("stdDeviation", 3)
.attr("result", "coloredBlur");

const merge = glow.append("feMerge");
merge.append("feMergeNode")
.attr("in", "coloredBlur");

merge.append("feMergeNode")
.attr("in", "SourceGraphic");

// Define X and Y Scales ---------------------------------------------------------------------
const xScale = d3.scaleTime()
.domain(d3.extent(data, d => d.date))
.range([margin.left, width - margin.right]);

const yScale = d3.scaleLinear()
.domain(d3.extent(data, d => d.progress))
.range([height - margin.bottom, margin.top]);

// Define line and Append ---------------------------------------------------------------------
const line = d3.line()
.x((d,i) => xScale(d.date))
.y(d => yScale(d.progress));

svg.append("path")
.datum(data)
.attr("class", "steps-line")
.attr("filter", "url(#glow)")
.attr("d", line);

// Define and Append grids ---------------------------------------------------------------------
const yGrid = d3.axisLeft(yScale)
.ticks(4)
.tickSize(-width)
.tickFormat("");

svg.append("g")
.attr("class", "grid")
.attr("transform", `translate(${margin.left},0)`)
.call(yGrid);

const xGrid = d3.axisBottom(xScale)
.ticks(4)
.tickSize(-height)
.tickFormat("");

svg.append("g")
.attr("class", "grid")
.attr("transform", `translate(0, ${height - margin.bottom})`)
.call(xGrid);

// Define and Append Axes  ---------------------------------------------------------------------
const yAxis = d3.axisLeft(yScale)
.ticks(6)
.tickFormat(d => `+${d / 1000}k`);
svg.append("g")
.attr("class", "axis")
.attr("transform", `translate(${margin.left},0)`)
.call(yAxis);

const xAxis = d3.axisBottom(xScale)
.ticks(d3.timeMonth.every(1))
.tickFormat(d3.timeFormat("%b"));
svg.append("g")
.attr("class", "axis")
.attr("transform", `translate(0, ${height - margin.bottom})`)
.call(xAxis);