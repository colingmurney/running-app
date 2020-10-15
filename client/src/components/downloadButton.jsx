import React, { Component } from "react";

class DownloadButton extends Component {
  state = {};
  render() {
    return (
    <div className="download">
      <button onClick={this.props.handleDownload} className="btn btn-primary">Download to JSON</button>
    </div>);
  }
}

export default DownloadButton;
