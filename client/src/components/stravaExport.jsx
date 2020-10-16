import React, { Component } from "react";
import getRefreshToken from "../utils/getRefreshToken";
import getActivities from "../utils/getActivities";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NavBar from "./navBar"
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected"
import downloadJSON from "../utils/downloadJSON"

class StravaExport extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    activities: JSON.parse(sessionStorage.getItem("stravaActivities")) || [],
    refresh_token: sessionStorage.getItem("read_refresh_token") || "",
    selectedIndex: []
  };

  async componentDidMount() {
    if (!this.state.refresh_token) {
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
      sessionStorage.setItem("read_refresh_token", refresh_token)
      this.setState({ activities });
    } 
    catch (error) {console.log(error);}
    }
  }

  handleSelect = (index) => {
    const activities = toggleSelected(index, this.state.activities)
    const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
    this.setState({activities, selectedIndex})
  }

  handleDownload = () => {
    const a = downloadJSON(this.state.activities, this.state.selectedIndex, "Strava Data")
    a.click()
  }  

  render() {
    //console.log(this.state.activities)
    return (
      <div>
        <NavBar title="Strava Export"/>
        <div className="container">
        <DownloadButton handleDownload={this.handleDownload} />
        <Table activities={this.state.activities} handleSelect={this.handleSelect} />
        </div>
      </div>
    );
  }
}

export default StravaExport;
