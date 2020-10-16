import React, { Component } from "react";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike"
import createActivity from "../utils/createActivity"
import getRefreshToken from "../utils/getRefreshToken"
import Table from "./table";
import NavBar from "./navBar";
import {toggleSelected, updateSelectedIndex} from "../utils/handleSelected"


class Converter extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    refresh_token: sessionStorage.getItem("write_refresh_token") || "",
    bearer_token: sessionStorage.getItem("nike_bearer_token") || "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
    selectedIndex: [],
    //test: [{name: "Colin"}, null,{name: "Colin"}],
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

    handleConvert = async () => {
      //use refresh token from state to get access_token
      //create function that makes http request passing nike_bearer, access_token, and selectedIndex in the body
      //response will be array of ids, make check update http requests with these IDs and see status for each

      let {client_id, client_secret, activities, selectedIndex, refresh_token} = this.state

      if (!refresh_token) return console.log("No refresh token (Please give authorization)")
      
      try {
        
      for (let i of selectedIndex) {
        
          const activityCreated = await createActivity(
            client_id,
            client_secret,
            refresh_token,
            activities[i].name,
            activities[i].type,
            activities[i].start_date_local,
            activities[i].moving_time,
            activities[i].description,
            activities[i].distance
          );
          delete activities[i] //turns object to null, but does not effect indexing
          console.log(activityCreated)
          
        }
       //reset selected
        selectedIndex = []

        this.setState({activities, selectedIndex})
      } catch (error) {
        console.log(error);
      }
    }

    handleSelect = (index) => {
      const activities = toggleSelected(index, this.state.activities)
      const selectedIndex = updateSelectedIndex(index, this.state.selectedIndex)
      this.setState({activities, selectedIndex})
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
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect} />}
      </div>
      </div>
    );
  }
}

export default Converter;
