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
import {tokenMsg, authMsg, convertMsg, statusMsg} from "../utils/stepMessages"
import statusMessages from "../utils/statusMessages"
import SelectAllButton from "./selectAllButton";
import handleSelectAll from "../utils/handleSelectAll";

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
    step: sessionStorage.getItem("write_refresh_token") ? convertMsg() : sessionStorage.getItem("nikeActivities") ? authMsg() : tokenMsg(),
    selectAll: false
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
          const step = convertMsg()
          this.setState({refresh_token, step})
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
      const step = authMsg()
      this.setState({activities, step, bearer_token: token})
    }

    handleSelect = (index) => {
      const activities = toggleSelected(index, this.state.activities)
      const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
      this.setState({activities, selectedIndex})
    }

    handleConvert = async () => {
      let {client_id, client_secret, selectedIndex, refresh_token, bearer_token, activities} = this.state

      try {
        //use refresh token from state to get access_token
          const access_token = await getAccessToken(client_id, client_secret, refresh_token);

        //create function that makes http request passing nike_bearer, access_token, and selectedIndex in the body
        const uploadIds = await uploadActivities(selectedIndex, access_token, bearer_token)
        console.log(uploadIds)
      
        //remove uploaded activitites from table with delete to not throw off indexing
        for (let i of selectedIndex) {
          delete activities[i]
        }
        
        selectedIndex = [];
        const step = statusMsg()
        this.setState({activities, selectedIndex, uploadIds, access_token, step})
        
      } catch (error) {
        console.log(error);
      }
    }

    handleStatus = async () => {
      const {uploadIds, access_token} = this.state;
        const uploadMessages = [];
        for (let id of uploadIds) {
          const uploadStatus = await checkUploadStatus(id, access_token)
          console.log(uploadStatus)
          uploadMessages.push(uploadStatus)
        }
        const step = convertMsg();
        statusMessages(uploadMessages)
        this.setState({step})
    }

    handleSelectAll = () => {
      let {selectAll, activities} = this.state;
      let selectedIndex = []

      if (!selectAll) {
        for (let i=0; i<activities.length; i++)
        selectedIndex.push(i);
      }

      activities = handleSelectAll(selectAll, activities);
      selectAll = !selectAll;
      this.setState({selectAll, activities, selectedIndex})
    }

  render() {
    const {activities, selectedIndex ,step} = this.state;
    return (
      <div>
        <NavBar step={step} title="Converter"/>
        <div className="container">
        <NikeForm handleSubmit={this.handleSubmit} />
        <button className="btn btn-primary btn-sm mr-2 custom-width">
          <a className="link" 
            href="http://www.strava.com/oauth/authorize?client_id=47805&response_type=code&redirect_uri=http://localhost:3000/converter/exchange_token&approval_prompt=force&scope=activity:write">
              Authorize
          </a>
        </button>
        <button className="btn btn-primary btn-sm mr-2 custom-width" onClick={this.handleConvert} disabled={step !== convertMsg() || selectedIndex.length === 0}>Convert</button>
        <button className="btn btn-primary btn-sm mr-2 custom-width" onClick={this.handleStatus} disabled={step !== statusMsg()}>Status</button>
        <SelectAllButton activities={activities} handleSelectAll={this.handleSelectAll} />
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect} type="nike" />}
      </div>
      </div>
    );
  }
}

export default Converter;
