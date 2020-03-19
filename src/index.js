import React, { Component } from "react";
import { render } from "react-dom";
import Visual from "./Visual";
import "./index.css";
import { getData } from "./api";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    try {
      const { success, result } = await getData();
      if (success) {
        this.setState({
          data: result.nodes
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { data } = this.state;
    return <div>{!!data.length ? <Visual value={data} /> : "数据为空"}</div>;
  }
}

render(<Index />, document.getElementById("root"));
