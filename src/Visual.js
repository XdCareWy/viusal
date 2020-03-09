import React, { Component } from "react";
import Snap from "snapsvg";
import {
  Circle,
  Text,
  Text1,
  getTextNodeBox,
  Ellipse,
  Square,
  Rectangle
} from "./basicSvg";

class Visual extends Component {
  componentDidMount() {
    const snap = Snap("#svgId");
    const c = Circle(snap, { x: 120, y: 250, r: 40 });
    const { height } = getTextNodeBox(snap, "asdasdas", 12);
    snap.text(0, height, "asdasdas");

    console.log(Snap.sin(45) * 100);
    Text1(snap, "活动1", {}, c);

    const ellipse = Ellipse(snap, { x: 150, y: 100, rx: 100, ry: 50 });
    const square = Square(snap, { x: 150, y: 300, width: 200, height: 100 });
    const rectangle = Rectangle(snap, { x: 150, y: 450, width: 100 });
  }

  render() {
    return (
      <div>
        <svg id="svgId" width={700} height={700} />
      </div>
    );
  }
}

export default Visual;
