// 1) Import Modules -------------------------------------------------
import * as d3 from 'd3';
import featureCollection from '../data/britain.json';
import * as lighthouses from '../data/lighthouse.json';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

// 2) Map Dimensions -------------------------------------------------
const fixedWidth = 600;
const fixedHeight = 800;
const svg = d3.select('#map')
  .attr('width', fixedWidth)
  .attr('height', fixedHeight);

function renderMap(svg, width, height) {
  const projection = d3.geoMercator()
    .scale(2800)
    .translate([width / 1.300, height / 0.2230]);

// 3) Map Outline ----------------------------------------------------
const path = d3.geoPath().projection(projection);

  svg.selectAll('path')
    .data(featureCollection.features)
    .enter().append('path')
    .attr('d', path)
    .attr('fill', '#1d1b1b')
    .attr('stroke', '#757e63')
    .attr('stroke-width', 1);

// 4) Glow effect (SVG) ----------------------------------------------------
  const defs = svg.append('defs');

  const filter = defs.append('filter')
    .attr('id', 'glow')
    .attr('filterUnits', 'userSpaceOnUse')
    .attr('x', '-50%')
    .attr('y', '-50%')
    .attr('width', '200%')
    .attr('height', '200%');

  filter.append('feGaussianBlur')
    .attr('stdDeviation', 10)
    .attr('result', 'coloredBlur');

  const feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode')
    .attr('in', 'coloredBlur');
  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');

// 5) Lighthouse Locations ------------------------------------------
  svg.selectAll('circle')
    .data(lighthouses)
    .enter().append('circle')
    .attr('cx', d => projection([+d.Longitude, +d.Latitude])[0])
    .attr('cy', d => projection([+d.Longitude, +d.Latitude])[1])
    .attr('r', 3)
    .attr('fill', 'white')
    .attr('stroke', 'grey')
    .attr('stroke-width', 0.5)
    .attr('filter', 'url(#glow)')
    .attr('opacity', 0)
    .transition()
    .delay(300)
    .duration(1250)
    .attr('opacity', 1);

// 6) Tooltip -------------------------------------------------------
  svg.selectAll(".hit-area")
    .data(lighthouses)
    .enter().append('circle')
    .attr('cx', d => projection([+d.Longitude, +d.Latitude])[0])
    .attr('cy', d => projection([+d.Longitude, +d.Latitude])[1])
    .attr('r', 10)
    .attr('fill', '#1d1b1b')
    .attr('stroke', 'white')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0)
    .each(function (d) {
      tippy(this, {
        allowHTML: true,
        content: `<b>${d.Name}</b><br>${d.Location}, ${d.Country}<br>Built: ${d.Year}`,
        theme: 'light',
        delay: [300, 200],
        animation: 'fade',
        duration: [1000, 500]
      });
    });

// 7) Lighthouse 'blink effect' --------------------------------------
  function blink() {
    svg.selectAll('circle') // Target all lighthouse dots
      .transition('blink')
      .duration(10)
      .attr('fill', '#1d1b1b')
      .transition('blink')
      .duration(10)
      .attr('fill', 'white')
      .end()
      .then(() => {
        setTimeout(blink, 6000);
      });
  }


  blink();
}

// 8) Render --------------------------------------------------------

renderMap(svg, fixedWidth, fixedHeight);
