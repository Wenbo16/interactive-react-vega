import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data/data.json';
import spec1 from './spec/spec1.js';
import spec2 from './spec/spec2.js';
import Vega from 'react-vega';
import lineChartSpec from './spec/lineChartSpec.js';
import radialHeatmapSpec from './spec/radialHeatmapSpec';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: spec1,
      lineChartSpec: lineChartSpec,
      radialHeatmapSpec: radialHeatmapSpec,
      data: data,
      highlightedPoint: null
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleLineChartHover = this.handleLineChartHover.bind(this);
    this.handleHeatmapHover = this.handleHeatmapHover.bind(this);
    this.toggleSpec = this.toggleSpec.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  handleHover(...args) {
    console.log(args[1].datum)
  }

  handleLineChartHover(...args) {
    console.log(args[1].datum)
    this.setState((state) => {
      let newLineChartSpec = state.lineChartSpec;
      newLineChartSpec.data[1].values = args[1].datum;
      console.log(JSON.stringify(newLineChartSpec))
      return {lineChartSpec: newLineChartSpec}
    });
    this.setState({ highlightedPoint: args[1].datum });
  }

  handleHeatmapHover(...args) {
    console.log(args[1])
    this.setState({ highlightedPoint: args[1] });
  }

  toggleSpec() {
    if (this.state.spec === spec1) {
      this.setState({ spec: spec2 });
    } else {
      this.setState({ spec: spec1 });
    }
  }

  updateData() {
    const table = [];
    for (let i = 1; i <= 20; i++) {
      table.push({
        category: String.fromCharCode(65 + i),
        amount: Math.round(Math.random() * 100),
      });
    }
    this.setState({ data: { table } });
  }

  render() {
    // let newLineChartSpec = this.state.lineChartSpec;
    // newLineChartSpec.data = this.state.pointsData;

    // let newRadialHeatmapSpec = this.state.radialHeatmapSpec;
    // newRadialHeatmapSpec.data = this.state.pointsData;

    // this.setState({
    //   lineChartSpec: newLineChartSpec,
    // })

    // this.setState({
    //   radialHeatmapSpec: newRadialHeatmapSpec
    // })
    
    return (
      <div>
        <button onClick={this.toggleSpec}>Toggle Spec</button>
        <button onClick={this.updateData}>Update data</button>
        <h3>React Component</h3>
        Will recompile when spec changes and update when data changes.
        <Vega
          spec={this.state.spec}
          data={this.state.data}
          onSignalTooltip={this.handleHover}
        />
        <Vega
          spec={this.state.lineChartSpec}
          onSignalHover={this.handleLineChartHover}
        />
        <br />
        <Vega
          spec={this.state.radialHeatmapSpec}
          onSignalHover={this.handleHeatmapHover}
        />
      </div>
    );
  }
}
