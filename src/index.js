import React, { Component } from "react";
import { render } from "react-dom";
import Visual from "./Visual";
import "./index.css";
import { getData, getErrorData } from "./api";
import { Switch, Input, message } from "antd";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errorId: [],
      delay: 5000,
      checked: false,
      mockErrorId: "04",
      reload: false
    };
    this.timeId = null;
  }
  async componentDidMount() {
    this.getAllData();
    const { delay, checked } = this.state;
    if (checked) {
      this.timeId = setInterval(() => {
        this.getAllData();
      }, delay);
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { reload, checked, delay } = this.state;
    if (reload) {
      this.getAllData();
      if (checked) {
        this.timeId = setInterval(() => {
          this.getAllData();
        }, delay);
      } else {
        clearInterval(this.timeId);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  async getAllData() {
    const { mockErrorId } = this.state;
    try {
      const [first, second] = await Promise.all([
        getData(),
        getErrorData({ id: mockErrorId })
      ]);
      if (first.success && second.success) {
        this.setState({
          data: first.result.nodes,
          errorId: second.result.list.map(item => +item),
          reload: false
        });
      } else {
        this.setState({
          data: [],
          errorId: [],
          reload: false
        });
      }
    } catch (e) {
      this.setState({ reload: false });
      console.log(e);
    }
  }

  handleSwitch = checked => {
    this.setState({ checked: checked, reload: checked });
    if (!checked) {
      clearInterval(this.timeId);
    }
  };
  handleSearch = value => {
    if (value) {
      this.setState({ mockErrorId: value, reload: true });
    } else {
      message.destroy();
      message.error("mockId不能为空");
    }
  };

  render() {
    const { data, errorId, checked } = this.state;
    return (
      <div>
        {!!data.length ? (
          <Visual value={data} errorId={errorId}>
            <div style={{ margin: "0 80px" }}>
              定时器开关：
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                checked={checked}
                onChange={this.handleSwitch}
              />
            </div>
            <div>
              异常节点mock：
              <Input.Search
                placeholder="mockId以0为分割，格式：0102023043"
                style={{ width: 340 }}
                onSearch={this.handleSearch}
              />
            </div>
          </Visual>
        ) : (
          "数据为空"
        )}
      </div>
    );
  }
}

render(<Index />, document.getElementById("root"));
