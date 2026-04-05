import * as d3 from 'd3';
// import * as steps from 'data/steps.json';

d3.json("./data/steps.json").then(data => {
    console.log(data);
})