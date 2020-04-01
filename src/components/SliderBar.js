import React, { Component } from "react";
import { Slider } from "antd";
class SliderBar extends Component {
  handleChange = value => {
    console.log(value);
    const { onChange } = this.props;
    onChange && onChange(value);
  };
  render() {
    const { value } = this.props;
    return (
      <div style={{ width: 200 }}>
        <Slider
          tooltipVisible={false}
          value={value}
          max={11}
          min={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SliderBar;
