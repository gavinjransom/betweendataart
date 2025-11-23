// Import Modules --------------------------------------------------------------------------------------------
import data from '../data/beckham.json'
// Import d3
import * as d3 from 'd3';
// Data
import pitchImage from '../assets/pitch.jpg'

// Graph Dimensions ------------------------------------------------------------------------------------------
const margin = {top: 20, right: 30, bottom: 40, left: 50},
      initialWidth = 700,
      initialHeight = 590;

const parsedDataDesktop = data.map(d => ({
    num: +d.num,
    x: +d.x,
    y: +d.y,
    x2: +d.x2,
    y2: +d.y2,
    curve: +d.curve,
    club: d.club,
    x3: +d.x3,
    y3: +d.y3,
    season: d.season,
    fixture: d.fixture
}));


// SVG -------------------------------------------------------------------------------------------------------
const svgDesktopContainer = d3.select(".desktop-svg-container")
.style("width", 700)
.style("height", 590);

const svgDesktop = svgDesktopContainer.append("svg")
.attr("width", 700)
.attr("height", 590);

const gDesktop = svgDesktop.append("g");

// Pitch Image
gDesktop.append("image")
.attr("xlink:href", pitchImage)
.attr("x", 0)
.attr("y", 0)
.attr("width", initialWidth)
.attr("height", initialHeight)
.attr("class", "pitch");

// Color Scale ------------------------------------------------------------------------------------------------
const colorScaleDesktop = d3.scaleOrdinal()
.domain(["AC Milan", "England", "LA Galaxy", "Manchester United", "Preston North End", "Real Madrid"])
.range(['#8e0f0f', '#fff', '#2256f1', '#cc3434', '#5cc0f6', '#5f5c5c']);

// Axes --------------------------------------------------------------------------------------------------------
// X Axis
const xDesktop = d3.scaleLinear()
.domain([0, 700])
.range([0, 700]);
gDesktop.append("g")
.attr("class", "axis")
.call(d3.axisBottom(xDesktop).tickSize(0).tickFormat(''));

// Y Axis
const yDesktop = d3.scaleLinear()
.domain([0, 590])
.range([590, 0]);
gDesktop.append("g")
.attr("class", "axis")
.call(d3.axisLeft(yDesktop).tickSize(0).tickFormat(''));

// Data Points --------------------------------------------------------------------------------------------------
const updateDatapointsDesktop = filteredData => {
    const dataPointsDesktop = gDesktop.selectAll(".dot")
    .data(filteredData, d => d.num); 

    dataPointsDesktop.exit().remove();
    
    const enteredDataPointsDesktop = dataPointsDesktop.enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 12)
    .attr("cx", d => xDesktop(d.x))
    .attr("cy", d => yDesktop(d.y))
    .attr("fill", d => colorScaleDesktop(d.club))
    .attr("stroke", '#000')
    .attr("stroke-width", 1)
    .style("opacity", 0); 

    enteredDataPointsDesktop
    .merge(dataPointsDesktop)
    .transition()
    .duration(2000)
    .style("opacity", 1) 
    .attr("cx", d => xDesktop(d.x))
    .attr("cy", d => yDesktop(d.y))
    .attr("fill", d => colorScaleDesktop(d.club))
    .attr("stroke", '#000')
    .attr("stroke-width", 1);
  
    gDesktop.selectAll(".dot")
    .on("mouseover", mouseOverDesktop)
    .on("mouseout", mouseOutDesktop);
};

// Hover Events --------------------------------------------------------------------------------------------------
// Mouse Over
const mouseOverDesktop = function(event, d) { // Maybe delete event?
    const linesDesktop = d3.line()
    .curve(d3.curveBundle.beta(d.curve))
    .x(d => xDesktop(d.x))
    .y(d => yDesktop(d.y));

    gDesktop.select(".pitch")
    .transition()
    .duration(200)
    .style("opacity", 0.3);

    d3.select(".desktop-tooltip")
    .style("display", "inline-block")
    .html(`${d.season}</br>${d.fixture}`)
    .transition()
    .duration(200)
    .style("opacity", 1);

    const pathDataDesktop = [
        {x: +d.x, y: +d.y, club: d.club}, 
        {x: +d.x2, y: +d.y2, club: d.club},
        {x: +d.x3, y: +d.y3, club: d.club}
    ];

    // Select existing path lines and bind new data
    const pathsDesktop = gDesktop.selectAll(".goal-path").data([pathDataDesktop]);

    // Remove any exiting paths
    pathsDesktop.exit().remove();

    // Enter new paths and merge with existing ones
    pathsDesktop.enter()
    .append("path")
    .attr("class", "goal-path")
    .merge(pathsDesktop)  
    .attr("d", linesDesktop)
    .attr("stroke", pathData => colorScaleDesktop(pathData[0].club))
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .style("opacity", 0)
    .transition()
    .duration(300)
    .style("opacity", 1);
};


// Mouse Out
const mouseOutDesktop = function() {
    gDesktop.select(".pitch")
    .transition()
    .duration(100)
    .style("opacity",1);

    d3.select(".desktop-tooltip")
    .transition()
    .duration(100)
    .style("opacity", 0);
    gDesktop.selectAll(".goal-path")
    .transition()
    .duration(100)
    .style("opacity",0);
};

updateDatapointsDesktop(parsedDataDesktop);

// Filter -----------------------------------------------------------------------------------------------------------
const dropdownDesktop = d3.select("#desktop-club-filter");

const clubDesktop = Array.from(new Set(parsedDataDesktop.map(d => d.club)));
clubDesktop.unshift("All Clubs");
clubDesktop.sort((a, b) => a === "All Clubs" ? -1 : b === "All Clubs" ? 1 : a.localeCompare(b));

clubDesktop.forEach(club => {
  dropdownDesktop.append("option").attr("value", club).text(club);
});

dropdownDesktop.on("change", function() {
  const selectedClubDesktop = dropdownDesktop.property("value");
  const filteredDataDesktop = selectedClubDesktop === "All Clubs" ? parsedDataDesktop : parsedDataDesktop.filter(d => d.club === selectedClubDesktop);
  updateDatapointsDesktop(filteredDataDesktop);
});


// Legend ---------------------------------------------------------------------------------------------------------------
const legendContainer = d3.select(".desktop-legend-container");
colorScaleDesktop.domain().forEach(clubDesktop => {
  const legendItem = legendContainer
  .append("div")
  .attr("class", "desktop-legend-item");
  
  legendItem
  .append("div")
  .attr("class", "desktop-legend-color")
  .style("background-color", colorScaleDesktop(clubDesktop));
  
  legendItem
  .append("span")
  .text(clubDesktop);
});