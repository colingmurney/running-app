import React, { Component } from "react";
import getRefreshToken from "../utils/getRefreshToken";
import getActivities from "../utils/getActivities";

class StravaExport extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    authCode: "",
    refresh_token: "",
    activities: [],
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const authCode = params.get("code");

    getRefreshToken(this.state.client_id, this.state.client_secret, authCode)
      .then((response) => {
        console.log(response);
        getActivities(this.state.client_id, this.state.client_secret, response);
      })
      .then((response) => {
        console.log(response);
        //this.setState({ activities: [response] });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return <div>{this.state.activities}</div>;
  }
}

export default StravaExport;
