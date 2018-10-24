import React, { Component } from 'react';

import '../node_modules/react-vis/dist/style.css'
import './App.css';
import {Treemap} from "react-vis";
// import {data} from './data'
import BubbleChart from '@weknow/react-bubble-chart-d3'

const myData = {
  // title: "analytics",
  color: '#222',
  children: [
    {
      title: "AgglomerativeCluster",
      size: 3938,
      color: '#2f88e0'
    },
    {
      title: "CommunityStructure",
      size: 3812,
      color: '#2f88e0'
    },
    {
      title: "HierarchicalCluster",
      size: 6714,
      color: '#2f88e0'
    },
    {
      title: "MergeEdge",
      size: 743,
      color: '#2f88e0'
    },
    {
      title: "BetweennessCentrality",
      size: 3534,
      color: '#009900'
    },
    {
      title: "LinkDistance",
      size: 5731,
      color: '#009900'
    },
    {
      title: "MaxFlowMinCut",
      size: 7840,
      color: '#009900'
    },
    {
      title: "ShortestPaths",
      size: 5914,
      color: '#009900'
    },
    {
      title: "SpanningTree",
      size: 3416,
      color: '#009900'
    },
    {
      title: "AspectRatioBanker",
      size: 7074,
      color: '#7a3d9a'
    }
  ]
}

const myDataNested = {
  // title: "analytics",
  color: '#222',
  children: [
    {
      // title: "cluster",
      color: '#19548e',
      children: [
        {
          title: "AgglomerativeCluster",
          size: 3938,
          color: '#2f88e0'
        },
        {
          title: "CommunityStructure",
          size: 3812,
          color: '#2f88e0'
        },
        {
          title: "HierarchicalCluster",
          size: 6714,
          color: '#2f88e0'
        },
        {
          title: "MergeEdge",
          size: 743,
          color: '#2f88e0'
        }
      ]
    },
    {
      // title: "graph",
      color: '#006600',
      children: [
        {
          title: "BetweennessCentrality",
          size: 3534,
          color: '#009900'
        },
        {
          title: "LinkDistance",
          size: 5731,
          color: '#009900'
        },
        {
          title: "MaxFlowMinCut",
          size: 7840,
          color: '#009900'
        },
        {
          title: "ShortestPaths",
          size: 5914,
          color: '#009900'
        },
        {
          title: "SpanningTree",
          size: 3416,
          color: '#009900'
        }
      ]
    },
    {
      // title: "optimization",
      color: '#4f2760',
      children: [
        {
          title: "AspectRatioBanker",
          size: 7074,
          color: '#7a3d9a'
        }
      ]
    }
  ]
}

const modes = [
  'squarify',
  // 'resquarify',
  'slice',
  'dice',
  'slicedice',
  'binary',
  'circlePack',
  // 'partition',
  // 'partition-pivot'
]

class App extends Component {
  state = {
    mode: 0,
    padding: 4
  }

  changeMode = () => {
    let {mode} = this.state
    mode = (mode+1) % modes.length
    this.setState({mode})
  }

  onLeafClick = (node, e) => {
    if (node){
      console.log({node,e})
      if(node.data){
        console.log({data: node.data})
        if(node.data.title){
          alert(node.data.title)
        }
      }
    }
  }

  getColor = datum => {
    console.log(datum)
    if(datum.title === 'analytics'){
      return '#222'
    }
    if(datum.color){
      return datum.color
    }
    return null
  }

  setPadding = ({target}) => {
    if (target.value >= 0 && target.value <= 100) {
      this.setState({padding: target.value})
    }
  }



  bubbleClick = (label) => {
    console.log(11, label)
    window.alert(label)
    // do something with the data
  }

  handleRBCClick = (...args) => {
    console.log(args)
  }

  getRGBComponents = (color) => {
    let r = color.substring(1, 3)
    let g = color.substring(3, 5)
    let b = color.substring(5, 7)

    return {
      R: parseInt(r, 16),
      G: parseInt(g, 16),
      B: parseInt(b, 16)
    }
  }

  idealTextColor = (bgColor) => {
    let nThreshold = 105
    let components = this.getRGBComponents(bgColor)
    let bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114)

    return ((255 - bgDelta) < nThreshold) ? '#000000' : '#ffffff'
  }

  getDarkColor = () => {
    let nThreshold = 105
    let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    let components = this.getRGBComponents(color)
    let bgDelta = (components.R * 0.114) + (components.G * 0.587) + (components.B * 0.299)
    while((255 - bgDelta) < nThreshold){
      color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      components = this.getRGBComponents(color)
      bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114)
    }
    return color
  }
  getLightColor = () => {
    let nThreshold = 105
    let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    let components = this.getRGBComponents(color)
    let bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114)
    while((255 - bgDelta) > nThreshold){
      color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      components = this.getRGBComponents(color)
      bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114)
    }
    return color
  }

  generateFlatFibonacciTreemapData = (maxItems = 10) => {
    let data = {
      name: 'Flat Treemap',
      children: []
    }
    let a = 1, b = 1
    data.children.push({
      name: `Fib-${a}`,
      value: a
    })
    data.children.push({
      name: `Fib-${b}`,
      value: b
    })
    while (data.children.length < maxItems) {
      let c = a + b
      data.children.push({
        value: c,
        name: `Fib-${c}`
      })
      a = b
      b = c
    }
    return data
  }

  generateNestedFibonacciTreemapData = (maxItems = 10) => {
    let data = {
      name: 'Nested Fibonacci',
      children: []
    }
    let a = 1, b = 1
    data.children.push({
      name: `Fib-${a}`,
      children: [
        {
          value: a,
          name: `Fib-${a}`,
        }
      ]
    })
    data.children.push({
      name: `Fib-${b}`,
      children: [
        {
          value: b,
          name: `Fib-${b}`,
        }
      ]
    })
    while (data.children.length < maxItems) {
      let c = a + b
      data.children.push({
        // value: c,
        name: `Fib-${c}`,
        children: [
          {
            value: c,
            name: `Fib-${c}`,
          }
        ]
      })
      a = b
      b = c
    }
    return data
  }

  generateFibonacciBubbleChartData = (maxItems = 10) => {
    let data = []
    let a = 1, b = 1
    data.push({value: a, label: `Fib-${a}`})
    data.push({value: b, label: `Fib-${b}`})
    while (data.length < maxItems) {
      let c = a + b
      data.push({
        value: c,
        label: `Fib-${c}`,
        color: this.getDarkColor()
      })
      a = b
      b = c
    }
    return data
  }

  render () {
    const {mode, padding} = this.state
    const treemapProps = {
      onLeafClick: this.onLeafClick,
      // onLeafMouseOver: this.onLeafMouseOver,
      getColor: this.getColor,
      height: 800,
      width: 800,
      padding,
      mode: modes[mode]
    }
    return (
      <div>
        <div
        >
          <div
            style={{
              width: '100%',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            Mode: {modes[mode]}&ensp;<button onClick={this.changeMode}>Change Mode</button>&ensp;|&ensp;<label>Padding <input type={'number'} value={this.state.padding} onChange={this.setPadding}/></label>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <div
              className={'treemapContainer'}
              style={{
                flex: '1 1 auto'
              }}
            >
              <Treemap
                colorType={'literal'}
                data={myData}
                {...treemapProps}
              />
            </div>
            <div
              className={'treemapContainer'}
              style={{
                flex: '1 1 auto'
              }}
            >
              <Treemap
                colorType={'literal'}
                data={myDataNested}
                {...treemapProps}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: '100vw',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div
            style={{
              flex: '1 1 auto'
            }}
          >
            <BubbleChart
              width={400}
              height={400}
              graph= {{
                zoom: 1,
                offsetX: -0.01,
                offsetY: 0
              }}
              showLegend={false}
              valueFont={{
                family: 'Arial',
                size: 0,
                color: 'transparent',
                weight: 'normal',
              }}
              labelFont={{
                family: 'Arial',
                size: 16,
                color: '#fff',
                weight: 'bold',
              }}
              bubbleClickFun={this.bubbleClick}
              data={this.generateFibonacciBubbleChartData(15)}
            />
          </div>
        </div>
      </div>
    );
  // }
// }
//
// class App extends Component {

  // render() {

    // // return (
    //   <div className="App">
    //     . . .
    //   </div>
    // );
  }
}

export default App;
