import React, { Component } from "react";

class DownloadButton extends Component {
  state = {};
  render() {
    const {selectedIndex} = this.props;
    const disabled = selectedIndex === undefined || selectedIndex.length === 0;
    return (
      <button onClick={this.props.handleDownload}
        disabled={disabled}
        className="btn btn-primary mr-3">
          Download to JSON
      </button>
    );
  }
}

export default DownloadButton;
