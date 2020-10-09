import React, { Component } from "react";
import getRefreshToken from "../utils/getRefreshToken";
import getActivities from "../utils/getActivities";
import Table from "./table";
import DownloadButton from "./downloadButton";

class StravaExport extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    activities: JSON.parse(sessionStorage.getItem("stravaActivities")) || [],
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
      sessionStorage.setItem("stravaActivities", JSON.stringify(activities));
      this.setState({ activities });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <DownloadButton activities={this.state.activities} />
        <Table activities={this.state.activities} />
      </div>
    );
  }
}

export default StravaExport;
