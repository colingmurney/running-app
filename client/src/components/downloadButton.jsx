import React, { Component } from "react";

class DownloadButton extends Component {
  state = {};
  render() {
    return (
      <button onClick={this.props.handleDownload} className="btn btn-primary mr-3">Download to JSON</button>
    );
  }
}

export default DownloadButton;
