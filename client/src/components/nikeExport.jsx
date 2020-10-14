import React, { Component } from "react";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike"
import NavBar from "./navBar"

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
    const {activities} = this.state
    return (
      <div>
        <NavBar title="Nike Export"/>
        <div className="container">
        <NikeForm handleSubmit={this.handleSubmit}/>
        <DownloadButton />
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect}/>}
        </div>
      </div>
    );
  }
}

export default NikeExport;
