import React, { Component } from "react";
import Snap from "snapsvg";
import Activity from "./business/Activity";
import Page from "./business/Page";
import Interface from "./business/Interface";
import DB from "./business/DB";
import ES from "./business/ES";
import Cache from "./business/Cache";
import MQ from "./business/MQ";

class Visual extends Component {
  componentDidMount() {
    const snap = Snap("#svgId");

    const activity = Activity(snap, 100, 50, "活动1");
    const page = Page(snap, 100, 110, "页面1");
    const inter = Interface(snap, 100, 190, "接口1");
    const db = DB(snap, 100, 270, "数据库1");
    const es = ES(snap, 100, 360, "es1");
    const cache = Cache(snap, 100, 440, "缓存1");
    const mq = MQ(snap, 100, 520, "mq1");
  }

  render() {
    return (
      <div style={{ border: "1px solid red" }}>
        <svg id="svgId" width={700} height={700} />
      </div>
    );
  }
}

export default Visual;
