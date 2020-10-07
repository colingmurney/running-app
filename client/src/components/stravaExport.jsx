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

  async componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const authCode = params.get("code");

    try {
      const refresh_token = await getRefreshToken(
        this.state.client_id,
        this.state.client_secret,
        authCode
      );
      const activities = await getActivities(
        this.state.client_id,
        this.state.client_secret,
        refresh_token
      );
      this.setState({ activities });
      console.log(this.state.activities);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <div></div>;
  }
}

export default StravaExport;
