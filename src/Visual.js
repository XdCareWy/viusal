import React, { Component } from "react";
import Snap from "snapsvg";
import { Circle, Text, Text1, getTextNodeBox } from "./basicSvg";

class Visual extends Component {
  componentDidMount() {
    const snap = Snap("#svgId");
    const c = Circle(snap, { x: 120, y: 250, r: 40 });
    const {height} = getTextNodeBox(snap,"asdasdas", 12);
    snap.text(0,height,"asdasdas")

    console.log(Snap.sin(45)*100)
    Text1(snap, "活动1", {}, c)
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
