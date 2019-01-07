const numCircles = 31; // should be determined from data.length, but this is sufficient for now.
const width = 450, height = width / 2 + 1, strokeWidth = (width / numCircles) / 2;

export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "width": width,
  "height": height,
  "signals": [
    {
      "name": "hover",
      "value": {},
      "on": [
        { "events": "symbol:mouseover", "update": "datum" },
        { "events": "symbol:mouseout", "update": "{}" }
      ]
    }
  ],
  
  "data": [
    { "name": "points", 
      "values":[{"distance":0, "value":6.230787851709032},{"distance":1,"value":2.3864547579071718},{"distance":2,"value":2.854203016171069},{"distance":3,"value":10.004250589931702},{"distance":4,"value":10.421166651247157},{"distance":5,"value":5.277149575440334},{"distance":6,"value":6.079968411848997},{"distance":7,"value":11.395565450553708},{"distance":8,"value":9.770198644711575},{"distance":9,"value":17.78382134805984},{"distance":10,"value":11.357696746074042},{"distance":11,"value":13.58351205375693},{"distance":12,"value":21.975686208090178},{"distance":13,"value":15.930461704700713},{"distance":14,"value":20.68187839773676},{"distance":15,"value":18.677719833271297},{"distance":16,"value":18.209196676737296},{"distance":17,"value":19.694993489623304},{"distance":18,"value":27.574341307275215},{"distance":19,"value":27.00531632327325},{"distance":20,"value":20.7984211829548},{"distance":21,"value":28.42974453991691},{"distance":22,"value":24.02577179340967},{"distance":23,"value":27.949008346120316},{"distance":24,"value":25.054336070318303},{"distance":25,"value":32.20494407767055},{"distance":26,"value":35.9214024778605},{"distance":27,"value":27.13897449337398},{"distance":28,"value":30.465768768086832},{"distance":29,"value":35.09927608663963},{"distance":30,"value":30.759044639939596}] },
    { "name": "highlightedPoint", "values": {"distance":1,"value":2.3864547579071718} }
  ],
  
  "scales": [
    {
      "name": "r",
      "type": "pow",
      "domain": {"data": "points", "field": "distance"},
      "exponent": 2,
      // From the vega-scenegraph source code: r = sqrt(size / Math.PI) ==> size = r^2 * Math.PI.
      "range": [strokeWidth * Math.PI, Math.pow((width - strokeWidth) / 2, 2) * Math.PI]
    },
    {
      "name": "color",
      "type": "linear",
      "domain": {"data": "points", "field": "value"},
      "range": ["#edf8b1", "#2c7fb8"]
    }
  ],
  "marks": [
    {
      "type": "symbol",
      "name": "ring",
      "from": {"data": "points"},
      "encode": {
        "enter": {
          "shape": "circle",
          "x": {"value": width / 2},
          "y": {"value": 0},
          "stroke": {"scale": "color", "field": "value"},
          "strokeWidth": {"value": strokeWidth},
          "fill": {"value": null},
          "size": {"scale": "r", "field": "distance"}
        }
      }
    },
    {
      "type": "symbol",
      "from": {
        "data": "highlightedPoint"
      },
      "interactive": false,
      "encode": {
        "enter": {
          "x": {"value": width / 2},
          "y": {"value": 0},
          "stroke": { "value": "#FA7F9F" },
          "strokeWidth": {"value": strokeWidth},
          "fill": {"value": null},

          "size": {"scale": "r", "field": "distance"}
        },
        // "update": {
        //   "x": { "value": width / 2, "signal": "hover.datum.distance" },
        //   "y": { "value": 0, "signal": "hover.datum.value" }
        // }
      }
    }
  ]
}