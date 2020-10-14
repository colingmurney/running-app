import React, { Component } from "react";
import getRefreshToken from "../utils/getRefreshToken";
import getActivities from "../utils/getActivities";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NavBar from "./navBar"

class StravaExport extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    activities: JSON.parse(sessionStorage.getItem("stravaActivities")) || [],
    selectedIndex: []
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

  handleSelect = (index) => {
    const activities = [...this.state.activities];
    activities[index].isSelected = !activities[index].isSelected;
    
    const selectedIndex = [...this.state.selectedIndex];
    if (selectedIndex.includes(index)) {
      const indexInSelectedIndex = selectedIndex.indexOf(index)
      selectedIndex.splice(indexInSelectedIndex, 1)
    } else {
      selectedIndex.push(index)
    }
    this.setState({activities, selectedIndex})
  }

  render() {
    return (
      <div>
        <NavBar title="Strava Export"/>
        <div className="container">
        <DownloadButton activities={this.state.activities} />
        <Table activities={this.state.activities} handleSelect={this.handleSelect} />
        </div>
      </div>
    );
  }
}

export default StravaExport;
