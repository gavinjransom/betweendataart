// Import modules
import data from '../data/steps.json'
import * as d3 from 'd3';

// Console Log to see data
// console.log(data);

data.forEach(d => {
d.date = new Date(d.date);
})

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

// Append SVG ---------------------------------------------------------------------
const svg = d3.select(".steps")
.append("svg")
.attr("width", width)
.attr("height", height)
// .attr("class", "steps-chart");

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
.tickFormat(d => `${d / 1000000}M`);
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