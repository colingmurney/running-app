import React, { Component } from "react";

class StravaExport extends Component {
  state = { authCode: "" };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    this.setState({ authCode: params.get("code") });
  }

  render() {
    return <div>{this.state.authCode}</div>;
  }
}

export default StravaExport;
