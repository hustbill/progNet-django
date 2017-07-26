import React, { Component } from 'react';
import Radium from "radium"

import Graph from 'react-graph-vis'

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import Headline from "../components/Headline"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  }
}

let options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

let events = {
  select: function(event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
  }
}

var nodes = null;
var edges = null;
var network = null;

// var DIR = './refresh-cl/';
var DIR = 'https://raw.githubusercontent.com/hustbill/network-verification-ui/webstorm/public/img/refresh-cl/';
var EDGE_LENGTH_MAIN = 220;

var EDGE_LENGTH_SUB = 80;

// Called when the Visualization API is loaded.
function draw() {
  // Create a data table with nodes.
  nodes = [];
  // Create a data table with links.
  edges = [];
  for (var i = 1; i <= 3; i++) {
    nodes.push({id: i, label: 'Switch' + i, image: DIR + 'switch-48.png', shape: 'image'});
  }
  edges.push({from: 1, to: 2, length: EDGE_LENGTH_MAIN});
  edges.push({from: 1, to: 3, length: EDGE_LENGTH_MAIN});

  for (var i = 4; i <= 7; i++) {
    nodes.push({id: i, label: 'Router' + i, image: DIR + 'cisco-router.png', shape: 'image'});
    edges.push({from: 2, to: i, length: EDGE_LENGTH_SUB});
  }
  nodes.push({id: 101, label: 'Computer-301', image: DIR + 'Hardware-My-Computer-3-icon.png', shape: 'image'});
  edges.push({from: 2, to: 101, length: EDGE_LENGTH_SUB});
  nodes.push({id: 102, label: 'Laptop-302', image: DIR + 'Hardware-Laptop-1-icon.png', shape: 'image'});
  edges.push({from: 3, to: 102, length: EDGE_LENGTH_SUB});
  nodes.push({id: 103, label: 'network drive', image: DIR + 'Network-Drive-icon.png', shape: 'image'});
  edges.push({from: 1, to: 103, length: EDGE_LENGTH_SUB});
  nodes.push({id: 104, label: 'Firewall104', image: DIR + 'System-Firewall-2-icon.png', shape: 'image'});
  edges.push({from: 1, to: 104, length: EDGE_LENGTH_SUB});
  for (var i = 200; i <= 201; i++ ) {
    nodes.push({id: i, label: 'Firewall'+ i, image: DIR + 'System-Firewall-2-icon.png', shape: 'image'});
    edges.push({from: 3, to: i, length: EDGE_LENGTH_SUB});
  }
  // create a network
    var graph = {
    nodes: nodes,
    edges: edges
  };
  return graph;
}


@connect(state => ({
  counters: state.counters,
}))
@Radium
export default class SampleAppContainer extends React.Component {
  handleClick() {
    let {dispatch} = this.props;
    dispatch(counterActions.increaseCounter())
  }

  render() {
    let {counters} = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div style={[styles.button]} onClick={() => this.handleClick()}>INCREASE</div>
            <p style={[styles.counter]}>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
            <div>
             <Graph graph={draw()} options={options} events={events} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
