import React, { Component } from "react";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike"
import NavBar from "./navBar"
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected"
import downloadJSON from "../utils/downloadJSON"


class NikeExport extends Component {
  state = {
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
    selectedIndex: []
  }
  
  handleSubmit = async (token) => {
    const activities = await getNike(token)
    sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
    this.setState({activities})
  }

  handleSelect = (index) => {
    const activities = toggleSelected(index, this.state.activities)
    const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
    this.setState({activities, selectedIndex})
  }

  handleDownload = () => {
    const a = downloadJSON(this.state.activities, this.state.selectedIndex, "Nike Data")
    a.click()
  }

  render() {
    const {activities} = this.state
    return (
      <div>
        <NavBar title="Nike Export"/>
        <div className="container">
        <NikeForm handleSubmit={this.handleSubmit}/>
        <DownloadButton handleDownload={this.handleDownload}/>
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect}/>}
        </div>
      </div>
    );
  }
}

export default NikeExport;
