import React, { Component } from "react";
import Table from "./table";
import DownloadButton from "./downloadButton";
import NikeForm from "./nikeForm";
import handleNikeForm from "../utils/handleNikeForm"

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
    const activities = await handleNikeForm(token)
    this.setState({activities})
  }

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
