import React, { Component } from "react";
import { Slider } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
class SliderBar extends Component {
  handleChange = value => {
    console.log(value);
    const { onChange } = this.props;
    onChange && onChange(value);
  };
  render() {
    const { value } = this.props;
    return (
      <div
        style={{
          width: 200,
          display: "flex",
          alignItems: "center",
          marginLeft: 70
        }}
      >
        <ZoomOutOutlined />
        <Slider
          style={{ width: 180, backgroundColor: "white" }}
          tooltipVisible={false}
          value={value}
          max={11}
          min={1}
          onChange={this.handleChange}
        />{" "}
        <ZoomInOutlined />
      </div>
    );
  }
}

export default SliderBar;
