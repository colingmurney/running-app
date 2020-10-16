import React, { Component } from "react";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike"
import uploadActivities from "../utils/uploadActivities"
import getRefreshToken from "../utils/getRefreshToken"
import Table from "./table";
import NavBar from "./navBar";
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected"
import getAccessToken from "../utils/getAccessToken";
import checkUploadStatus from "../utils/checkUploadStatus"

class Converter extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    refresh_token: sessionStorage.getItem("write_refresh_token") || "",
    bearer_token: sessionStorage.getItem("nike_bearer_token") || "",
    access_token: "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
    selectedIndex: [],
    uploadIds: [],
    uploadMessages: [],
    err: ""
  }
   
  async componentDidMount(){
    if (!this.state.refresh_token) {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const authCode = params.get("code");

      if (authCode) {
        try {
          const refresh_token = await getRefreshToken(
            this.state.client_id,
            this.state.client_secret,
            authCode
          )

          sessionStorage.setItem("write_refresh_token", refresh_token)
          this.setState({refresh_token})
        } catch(error) {
          console.log(error)
        }
      } 
    }
  }

    handleSubmit = async (token) => {
      const activities = await getNike(token)
      sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
      sessionStorage.setItem("nike_bearer_token", token);
      this.setState({activities})
    }

    handleSelect = (index) => {
      const activities = toggleSelected(index, this.state.activities)
      const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
      this.setState({activities, selectedIndex})
    }

    handleConvert = async () => {
      let {client_id, client_secret, selectedIndex, refresh_token, bearer_token, activities} = this.state

      if (!refresh_token) return console.log("No refresh token (Please give authorization)")

      try {
      //use refresh token from state to get access_token
        const access_token = await getAccessToken(client_id, client_secret, refresh_token);
        console.log(access_token)

      //create function that makes http request passing nike_bearer, access_token, and selectedIndex in the body
      const uploadIds = await uploadActivities(selectedIndex, access_token, bearer_token)
      console.log(uploadIds)
      
      //   loop through selected index and delete activities
      for (let i of selectedIndex) {
        delete activities[i] //turns object to null, but does not effect indexing
      }
      //reset selectedIndex
      selectedIndex = []
      this.setState({activities, selectedIndex, uploadIds, access_token})
      
      } catch (error) {
        console.log(error);
      }
    }

    handleStatus = async () => {
      const {uploadIds, access_token} = this.state;

      if (uploadIds.length > 0) {
        const uploadMessages = [];
        for (let id of uploadIds) {
          const uploadStatus = await checkUploadStatus(id, access_token)
          console.log(uploadStatus)
          uploadMessages.push(uploadStatus)
        }
        this.setState({uploadMessages})
      } 
      else {
        //display message if no runs have been converted
        const err = "Please convert activities before checking their status";
        this.setState({err});
      }
    }

  render() {
    const {activities} = this.state;
    return (
      <div>
        <NavBar title="Converter"/>
        <div className="container">
        <NikeForm handleSubmit={this.handleSubmit} />
        <button><a href="http://www.strava.com/oauth/authorize?client_id=47805&response_type=code&redirect_uri=http://localhost:3000/converter/exchange_token&approval_prompt=force&scope=activity:write">authorize</a></button>
        <button onClick={this.handleConvert}>Convert</button>
        <button onClick={this.handleStatus}>Status</button>
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect} />}
      </div>
      </div>
    );
  }
}

export default Converter;
