/*global document:false*/
/*global window:false */
import React from "react";
import ReactDOM from "react-dom";
import {VictoryAxis} from "../src/index";
import d3 from "d3";
import _ from "lodash";
import Radium from "radium";

@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickValues: [5, 10, 25, 31, 42],
      domain: [-5, 5]
    };
  }

  getTickValues() {
    return _.map(_.range(5), (i) => {
      return 10 * i + _.random(5);
    });
  }


  getDomain() {
    const someNumber = _.random(2, 5);
    return [-someNumber, someNumber];
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    window.setInterval(() => {
      this.setState({
        tickValues: this.getTickValues(),
        domain: this.getDomain()
      });
    }, 2000);
  }

  render() {
    const styleOverrides = {
      axis: {
        stroke: "red"
      },
      grid: {
        strokeWidth: 2
      },
      ticks: {
        strokeWidth: 5
      }
    };

    return (
      <div className="demo">
        <div>
          <h1>Animating Axis</h1>
          <VictoryAxis style={styleOverrides}
            padding={60}
            label={"animation\nwow!"}
            tickValues={this.state.tickValues}
            tickFormat={["first", "second", "third", "fourth", "fifth"]}
            animate={{velocity: 0.01}}
          />
        </div>
        <div>
          <h1>Time Scale Axis</h1>
          <VictoryAxis
            label="time axis"
            padding={{left: 10, right: 80}}
            scale={d3.time.scale()}
            style={{grid: {stroke: "black", strokeWidth: 1}}}
            tickValues={[
              new Date(1980, 1, 1),
              new Date(1990, 1, 1),
              new Date(2000, 1, 1),
              new Date(2010, 1, 1),
              new Date(2020, 1, 1)]}
            tickFormat={d3.time.format("%Y")}
          />
        </div>
        <div>
        <h1>X-Y Axis</h1>
          <svg style={{width: 500, height: 400}}>
            <VictoryAxis crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              offsetY={200} /* half of the height */
              standalone={false}
            />
            <VictoryAxis dependentAxis crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              offsetX={250} /* half of the width */
              standalone={false}
            />
          </svg>
        </div>
        <div>
        <h1>Log Scale Axis</h1>
          <VictoryAxis
            label="cool log axis"
            padding={{top: 10, bottom: 60}}
            orientation="left"
            scale={d3.scale.log()}
            domain={[1, 5]}
            offsetX={50}
          />
          <VictoryAxis
            label="cool log axis"
            padding={{top: 10, bottom: 60}}
            orientation="right"
            scale={d3.scale.log()}
            domain={[1, 5]}
          />
        </div>
        <div>
          <h1>Ordinal Scales</h1>
          <VictoryAxis
            orientation="top"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
          <VictoryAxis
            orientation="right"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
          <VictoryAxis
            orientation="bottom"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
          <VictoryAxis
            orientation="left"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
        </div>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
