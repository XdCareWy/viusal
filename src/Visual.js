import React, { Component } from "react";
import Snap from "snapsvg";
import Activity from "./business/Activity";
import Page from "./business/Page";
import Interface from "./business/Interface";
import DB from "./business/DB";
import ES from "./business/ES";
import Cache from "./business/Cache";
import MQ from "./business/MQ";
import mockData from "./mock";
import { groupData } from "./tool";
import { flat } from "./tool/utils";
import { ROW_SPACING, COLUMN_SPACING, TYPES } from "./tool/constants";

class Visual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }
  componentDidMount() {
    const snap = Snap("#svgId");
    const { data, maxWidth, maxHeight } = groupData(mockData);
    const svgWidth = (maxWidth + 1) * ROW_SPACING;
    const svgHeight = (maxHeight + 1) * COLUMN_SPACING;
    this.addCoordinate(snap, data, svgWidth, svgHeight);
    this.setState({
      width: svgWidth,
      height: svgHeight
    });
  }
  paint = (snap, node) => {
    const nodeMapFn = {
      [TYPES.active]: Activity,
      [TYPES.page]: Page,
      [TYPES.interfaceType]: Interface,
      [TYPES.db]: DB,
      [TYPES.es]: ES,
      [TYPES.cache]: Cache,
      [TYPES.mq]: MQ
    };
    const fn = nodeMapFn[node.type];
    fn(snap, node.x, node.y, node.pointName);
  };
  addCoordinate = (snap, data, svgWidth, svgHeight) => {
    let x = svgWidth / (data.length + 1);
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const currentX = x + ROW_SPACING * i;
      const y = svgHeight / (item.length + 1);
      for (let j = 0; j < item.length; j++) {
        const tmp = item[j];
        const currentY = y + COLUMN_SPACING * j;
        tmp.x = currentX;
        tmp.y = currentY;
        this.paint(snap, tmp);
      }
    }
    console.log(data);
    this.paintLine(snap, data);
  };
  paintLine = (snap, data) => {
    const flatData = flat(data);
    flatData.forEach((node, index, arr) => {
      const ids = node.children.reduce((acc, cur) => acc.concat(cur.sid), []);
      const children = arr.filter(i => ids.includes(i.id));
      children.forEach(j => {
        this.lineArrow(snap, node, j);
      });
    });
  };

  lineArrow = (snap, parent, child) => {
    console.log(parent);
    console.log(child);
    if (parent.x && parent.y && child.x && child.y) {
      snap.line(parent.x, parent.y, child.x, child.y).attr({
        stroke: "gray",
        strokeWidth: 2
      });
    }
  };

  render() {
    const { width, height } = this.state;
    return (
      <div style={{ border: "1px solid red" }}>
        <svg id="svgId" width={width} height={height} />
      </div>
    );
  }
}

export default Visual;
