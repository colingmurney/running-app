import React, { Component } from "react";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike";
import NavBar from "./navBar";
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected";
import SelectAllButton from "./selectAllButton";
import handleSelectAll from "../utils/handleSelectAll";
import downloadJSON from "../utils/downloadJSON";
import nikeDownload from "../utils/nikeDownload"

class NikeExport extends Component {
  state = {
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
    bearer_token: sessionStorage.getItem("nike_bearer_token") || "",
    selectedIndex: [],
    selectAll: false
  }
  
  handleSubmit = async (token) => {
    const activities = await getNike(token)
    sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
    sessionStorage.setItem("nike_bearer_token", token);
    this.setState({activities, bearer_token: token})
  }

  handleSelect = (index) => {
    const activities = toggleSelected(index, this.state.activities)
    const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
    this.setState({activities, selectedIndex})
  }

  handleDownload = async () => {
    const {bearer_token, selectedIndex} = this.state
    const activities = await nikeDownload(bearer_token, selectedIndex)
    const a = await downloadJSON(activities, "Nike Data")
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
        <NavBar title="Nike Export"/>
        <div className="container">
        <NikeForm handleSubmit={this.handleSubmit}/>
        <DownloadButton handleDownload={this.handleDownload}/>
        <SelectAllButton activities={activities} handleSelectAll={this.handleSelectAll} />
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect}/>}
        </div>
      </div>
    );
  }
}

export default NikeExport;
