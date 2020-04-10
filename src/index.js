import React, { Component } from "react";
import { render } from "react-dom";
import Visual from "./Visual";
import "./index.css";
import { getData, getErrorData } from "./api";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errorId: []
    };
  }
  async componentDidMount() {
    try {
      const [first, second] = await Promise.all([
        getData(),
        getErrorData({ id: "0607" })
      ]);
      if (first.success && second.success) {
        this.setState({
          data: first.result.nodes,
          errorId: second.result.list.map(item => +item)
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { data, errorId } = this.state;
    return (
      <div>
        {!!data.length ? <Visual value={data} errorId={errorId} /> : "数据为空"}
      </div>
    );
  }
}

render(<Index />, document.getElementById("root"));
