import React, { Component } from "react";
import NikeForm from "./nikeForm";
import handleNikeForm from "../utils/handleNikeForm"
import Table from "./table";
import DownloadButton from "./downloadButton";

class Converter extends Component {
  state = {
    token: "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
  }
    
    handleSubmit = async (token) => {
      const activities = await handleNikeForm(token)
      this.setState({activities})
    }

  render() {
    const {activities} = this.state;
    return (
      <div>
        <NikeForm handleSubmit={this.handleSubmit} />
        <DownloadButton activities={activities} />
        {activities && !!activities.length &&
        <Table activities={activities} />}
        
        
      </div>
    );
  }
}

export default Converter;
