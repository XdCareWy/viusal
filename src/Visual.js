import React, { Component, Fragment } from "react";
import Snap from "snapsvg";
import Activity from "./business/Activity";
import Page from "./business/Page";
import Interface from "./business/Interface";
import DB from "./business/DB";
import ES from "./business/ES";
import Cache from "./business/Cache";
import MQ from "./business/MQ";
// import mockData from "./mock";
import { groupData } from "./tool";
import { flat } from "./tool/utils";
import { ROW_SPACING, COLUMN_SPACING, TYPES } from "./tool/constants";
import { ArrowLine } from "./basicSvg";
import SliderBar from "./components/SliderBar";

class Visual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      sliderValue: 7
    };
  }
  componentDidMount() {
    const { value, errorId } = this.props;
    const snap = Snap("#svgId");
    const { data, maxWidth, maxHeight } = groupData(value);
    const svgWidth = (maxWidth + 1) * ROW_SPACING;
    const svgHeight = (maxHeight + 1) * COLUMN_SPACING;
    this.addCoordinate(snap, data, svgWidth, svgHeight);

    this.renderError(snap, data, errorId);
    this.setState({
      width: svgWidth,
      height: svgHeight
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value, errorId } = this.props;
    const snap = Snap("#svgId");
    snap.clear();
    const { data, maxWidth, maxHeight } = groupData(value);
    const svgWidth = (maxWidth + 1) * ROW_SPACING;
    const svgHeight = (maxHeight + 1) * COLUMN_SPACING;
    this.addCoordinate(snap, data, svgWidth, svgHeight);
    this.renderError(snap, data, errorId);
    if (prevState.width !== svgWidth || prevState.height !== svgHeight) {
      this.setState({
        width: svgWidth,
        height: svgHeight
      });
    }
  }

  renderError = (snap, data, errorId) => {
    const flatData = flat(data);
    let allErrorIds = errorId;
    // 1. 知道当前异常的节点
    for (let id of errorId) {
      const r = loop(flatData, id);
      allErrorIds = [...allErrorIds, ...r];
    }
    // 递归找到所有的父节点
    function loop(sourceData, id) {
      let parentIdsRes = [];
      // 1. 找到当前的节点
      const currentNode = flatData.find(item => item.id === id);
      // 2. 找到当前节点的父节点id
      const parentIds = currentNode.parents.reduce(
        (acc, cur) => acc.concat(cur.fid),
        []
      );
      // 2.1 存储线段的id
      parentIds.forEach(parentId => {
        parentIdsRes.push(`line_${parentId}_${id}`);
      });
      // 3. 如果父节点ids不为空，循环调用
      if (parentIds.length) {
        for (let i = 0; i < parentIds.length; i++) {
          // 递归前，先判断该id是否已经递归过了，如果递归过了，就不再进行递归
          if (!parentIdsRes.includes(parentIds[i])) {
            const loopRes = loop(sourceData, parentIds[i]);
            parentIdsRes = [...parentIds, ...loopRes, ...parentIdsRes];
          }
        }
        return parentIdsRes;
      }
      return parentIdsRes;
    }

    [...new Set(allErrorIds)].forEach(item => {
      if (typeof item === "string") {
        snap.select(`#${item}`).attr({
          stroke: "red"
        });
      } else {
        snap.select(`#module_${item}`).attr({
          fill: "red"
        });
        if (errorId.includes(item)) {
          snap.select(`#module_${item}`).attr({
            class: "breath-effect"
          });
        }
      }
    });
  };

  highlightNode = node => {
    const lines = [];
    const parentIds = node.parents.reduce(
      (acc, cur) => acc.concat(cur.fid),
      []
    );
    const childrenIds = node.children.reduce(
      (acc, cur) => acc.concat(cur.sid),
      []
    );
    parentIds.forEach(i => lines.push(`line_${i}_${node.id}`));
    childrenIds.forEach(i => lines.push(`line_${node.id}_${i}`));
    return [
      ...lines,
      ...[...parentIds, ...childrenIds, node.id].map(i => `module_${i}`)
    ];
  };

  // 根据节点type绘制各个模块
  paintGraph = (snap, node, isRemove) => {
    const nodeMapFn = {
      [TYPES.active]: Activity,
      [TYPES.page]: Page,
      [TYPES.interfaceType]: Interface,
      [TYPES.db]: DB,
      [TYPES.es]: ES,
      [TYPES.cache]: Cache,
      [TYPES.mq]: MQ
    };
    const fn = nodeMapFn[node.serviceType];
    const tips = [`服务名称: ${node.serviceName}`];
    node.count && tips.push(`调用量: ${node.count}`);
    node.tp99 && tips.push(`tp99: ${node.count}`);
    node.cpu && tips.push(`cpu: ${node.count}`);
    const graph = fn(snap, node.x, node.y, tips.join(";"), node.id);
    graph.hover(
      () => {
        const allElements = this.highlightNode(node);
        allElements.forEach(l => snap.select(`#${l}`).addClass("module-red"));
      },
      () => {
        const allElements = this.highlightNode(node);
        allElements.forEach(l =>
          snap.select(`#${l}`).removeClass("module-red")
        );
      }
    );
    const { cx, cy, width, height } = graph.getBBox();
    const top = [cx, cy - height / 2];
    const right = [cx + width / 2, cy];
    const bottom = [cx, cy + height / 2];
    const left = [cx - width / 2, cy];
    if (isRemove) {
      graph.remove();
    }
    return { top, right, bottom, left };
  };
  // 计算各个节点的位置（即x，y坐标），并将其绘制出来
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
        // 计算模块的边界坐标
        tmp.lineCoordinate = this.paintGraph(snap, tmp, true);
      }
    }
    // 先画线
    this.paintLine(snap, data);
    // 再画模块
    flat(data).forEach(node => {
      this.paintGraph(snap, node, false);
    });
  };
  // 循环处理各个模块，找出上下对应关系
  paintLine = (snap, data) => {
    const flatData = flat(data);
    flatData.forEach((node, index, arr) => {
      const ids = node.children.reduce((acc, cur) => acc.concat(cur.sid), []);
      const children = arr.filter(i => ids.includes(i.id));
      children.forEach(j => {
        // 找到父节点与子节点的关系节点
        const relationObj = node.children.find(i => i.sid === j.id);
        this.lineArrow(snap, node, j, relationObj);
      });
    });
  };
  // 绘制连线
  lineArrow = (snap, parent, child, relationObj) => {
    if (parent.x && parent.y && child.x && child.y) {
      const right = parent.lineCoordinate.right;
      const left = child.lineCoordinate.left;
      // relation 1表示串行，2表示并行
      ArrowLine(
        snap,
        { x1: right[0], y1: right[1], x2: left[0], y2: left[1] },
        {
          tips:
            +relationObj.relation === 1
              ? `串行${relationObj.seq}`
              : `并行${relationObj.seq}`,
          id: `${parent.id}_${child.id}`
        }
      );
    }
  };

  handleChange = value => {
    this.setState({ sliderValue: value });
  };

  render() {
    const { width, height, sliderValue } = this.state;
    return (
      <Fragment>
        <div
          style={{
            border: "1px solid #dfdfdf",
            borderBottom: "0",
            width: "90%",
            overflow: "auto",
            margin: "0 auto",
            fontSize: "12px"
          }}
        >
          <h1
            style={{
              textAlign: "center",
              borderBottom: "1px solid #dfdfdf",
              paddingBottom: "15px"
            }}
          >
            全链路拓扑图
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "100px"
              }}
            >
              <strong>说明：</strong>
              <ul style={{ marginTop: "10px", marginLeft: "10px" }}>
                <li>实线： 串行</li>
                <li>虚线： 并行</li>
              </ul>
            </div>
            <SliderBar value={sliderValue} onChange={this.handleChange} />
            {this.props.children}
          </div>
        </div>
        <div
          style={{
            border: "1px solid #dfdfdf",
            width: "90%",
            overflow: "auto",
            margin: "0 auto"
          }}
        >
          <svg
            id="svgId"
            width={width}
            height={height}
            viewBox={`0 0 ${(width * (20 - sliderValue)) / 10} ${(height *
              (20 - sliderValue)) /
              10}`}
          />
        </div>
      </Fragment>
    );
  }
}

export default Visual;
