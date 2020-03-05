import React, { Component } from "react";
import { render } from "react-dom";
import Visual from "./Visual";

class Index extends Component {
  render() {
    return (
      <div>
        <Visual />
      </div>
    );
  }
}

render(<Index />, document.getElementById("root"));
