import React, { Component } from "react";
import getRefreshToken from "../utils/getRefreshToken";
import getActivities from "../utils/getActivities";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NavBar from "./navBar";
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected";
import SelectAllButton from "./selectAllButton";
import handleSelectAll from "../utils/handleSelectAll";
import downloadJSON from "../utils/downloadJSON";
import stravaDownload from "../utils/stravaDownload"

class StravaExport extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    activities: JSON.parse(sessionStorage.getItem("stravaActivities")) || [],
    refresh_token: sessionStorage.getItem("read_refresh_token") || "",
    selectedIndex: [],
    selectAll: false,
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
        refresh_token,
      );

      sessionStorage.setItem("stravaActivities", JSON.stringify(activities));
      sessionStorage.setItem("read_refresh_token", refresh_token)
      this.setState({ activities, refresh_token });
    } 
    catch (error) {console.log(error);}
  } 

  handleSelect = (index) => {
    const activities = toggleSelected(index, this.state.activities)
    const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
    this.setState({activities, selectedIndex})
  }

  handleDownload = async () => {
    const {client_id, client_secret, refresh_token, selectedIndex} = this.state;
    const activities = await stravaDownload(client_id, client_secret, refresh_token, selectedIndex)
    const a = await downloadJSON(activities, "Strava Data")
    a.click()
  } 

  handleSelectAll = () => {
    let {selectAll, activities} = this.state;
    activities = handleSelectAll(selectAll, activities);
    selectAll = !selectAll;
    this.setState({selectAll, activities})
  }

  render() {
    const {activities} = this.state
    return (
      <div>
        <NavBar title="Strava Export"/>
        <div className="container">
        <DownloadButton handleDownload={this.handleDownload} />
        <SelectAllButton activities={activities} handleSelectAll={this.handleSelectAll} />
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect} type="strava"/>}
        </div>
      </div>
    );
  }
}

export default StravaExport;
