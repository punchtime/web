const colorScale = d3.scale.ordinal()
  .range(['#1de9b6', '#e91d50'])
  .domain(['good', 'bad']);
const chart = d3.timeline()
  .colors(colorScale)
  .colorProperty('status')
  .showTimeAxisTick()
  .hover(function (d, i, datum) {
    alert(datum.label);
  })
  .stack();

const testData = [{
  label: "Haroen Viaene",
  status: "good",
  times: [{
    "starting_time": 1355759910000,
    "ending_time": 1355761900000
  }]
}, {
  label: "Arnaud Weyts",
  status: "bad",
  times: [{
    "starting_time": 1355752800000,
    "ending_time": 1355759900000
  }, {
    "starting_time": 1355767900000,
    "ending_time": 1355774400000
  }]
}, {
  label: "Elias Meire",
  status: "bad",
  times: [{
    "starting_time": 1355761910000,
    "ending_time": 1355763910000
  }]
}];

let svg = d3.select("#timeline")
  .append("svg")
  .attr("width", window.innerWidth)
  .datum(testData).call(chart);
