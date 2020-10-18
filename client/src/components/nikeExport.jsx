import React, { Component } from "react";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike";
import NavBar from "./navBar";
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected";
import downloadJSON from "../utils/downloadJSON";
import SelectAllButton from "./selectAllButton";
import handleSelectAll from "../utils/handleSelectAll";

class NikeExport extends Component {
  state = {
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
    selectedIndex: [],
    selectAll: false
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
        <SelectAllButton handleSelectAll={this.handleSelectAll} />
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect}/>}
        </div>
      </div>
    );
  }
}

export default NikeExport;
