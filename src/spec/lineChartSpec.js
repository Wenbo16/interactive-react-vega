export default {
  "$schema": "https://vega.github.io/schema/vega/v4.json",
  "width": 400,
  "height": 400,
  "padding": 10,
  "signals": [
    {
      "name": "hover",
      "value": {},
      "on": [
        { "events": "path:mouseover", "update": "datum" },
        { "events": "path:mouseout", "update": "{}" }
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
      "name": "x",
      "type": "linear",
      "domain": { "data": "points", "field": "distance" },
      "range": "width"
    },
    {
      "name": "y",
      "type": "linear",
      "domain": { "data": "points", "field": "value" },
      "range": "height",
      "nice": true
    }
  ],
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "offset": 5,
      "title": "Distance",
      "zindex": 0,
      "tickSize": 5
    },
    {
      "orient": "left",
      "scale": "y",
      "offset": 5,
      "title": "Value",
      "zindex": 0,
      "tickSize": 5
    }
  ],
  "marks": [
    {
      "name": "points_mark",
      "type": "line",
      "from": { "data": "points" },
      "interactive": false,
      "encode": {
        "enter": {
          "x": { "scale": "x", "field": "distance" },
          "y": { "scale": "y", "field": "value" },
          "stroke": { "value": "#5357a1" },
          "strokeWidth": { "value": 2 }
        }
      }
    },
    {
      "type": "path",
      "name": "cell",
      "from": {"data": "points_mark"},
      "encode": {
        "enter": {
          "fill": { "value": "transparent" },
          // "stroke": { "value": "red"}
        }
      },
      "transform": [
        {
          "type": "voronoi",
          "x": "datum.x", "y": "datum.y",
          "size": [{"signal": "width"}, {"signal": "height"}]
        }
      ]
    },
    {
      "type": "symbol",
      "from": {
        "data": "highlightedPoint"
      },
      "interactive": false,
      "encode": {
        "enter": {
          "x": { "scale": "x", "field": "distance" },
          "y": { "scale": "y", "field": "value" },
          "fill": { "value": "#fa7f9f" },
          "stroke": { "value": "#891836" },
          "strokeWidth": { "value": 1 },
          "size": { "value": 64 }
        },
        // "update": {
        //     "x": { "scale": "x", "signal": "hover.datum.distance" },
        //     "y": { "scale": "y", "signal": "hover.datum.value" }
        // }
      }
    }
  ]
}