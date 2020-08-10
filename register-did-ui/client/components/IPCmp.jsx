import React, { Component } from "react";

class IPCmp extends Component {
  async componentDidMount() {
    this.props.onGetIP();
  }
  render() {
    return (
      <div>
        <u>Details from your IP:</u>
        {Object.keys(this.props.ipDetails).map((key) => (
          <div key={key}>{this.props.ipDetails[key]}</div>
        ))}
      </div>
    );
  }
}

export default IPCmp;
