import React, { Component } from "react";
import getNike from "../utils/getNike";
import formatNike from "../utils/formatNike";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NikeForm from "./nikeForm";

class NikeExport extends Component {
  constructor(props){
    super(props)
    this.state = {
    token: "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
  }

  this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit = async (token) => {
    try {
      let activities = await getNike(token);
      console.log(activities); //will be undefined if token is incorrect
      
      //reformat data before setting the state
      activities = formatNike(activities);
      sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
      this.setState({ activities });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <NikeForm handleSubmit={this.handleSubmit}/>
        <DownloadButton />
        <Table activities={this.state.activities} />
      </div>
    );
  }
}

export default NikeExport;
