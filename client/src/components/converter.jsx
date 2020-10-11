import React, { Component } from "react";
import NikeForm from "./nikeForm";
import handleNikeForm from "../utils/handleNikeForm"
import createActivity from "../utils/createActivity"
import getRefreshToken from "../utils/getRefreshToken"
import Table from "./table";

class Converter extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    token: "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
  }
    
    handleSubmit = async (token) => {
      const activities = await handleNikeForm(token)
      this.setState({activities})
    }

    handleConvert = async () => {
      //get param from url
      //use create activity function passing in ONE form this.state.activity to test
      //then will have to mkae something to select which activities to convert

      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const authCode = params.get("code");

      const {client_id, client_secret, activities} = this.state
      
      try {
        const refresh_token = await getRefreshToken(
          client_id,
          client_secret,
          authCode
        );
        console.log(activities)
        console.log(activities[0].name)
        console.log(activities[0].type)
        console.log(activities[0].start_date_local)
        console.log(activities[0].moving_time)
        console.log(activities[0].description)
        console.log(activities[0].distance)
        
        const activityCreated = await createActivity(
          client_id,
          client_secret,
          refresh_token,
          activities[0].name,
          activities[0].type,
          activities[0].start_date_local,
          activities[0].moving_time,
          activities[0].description,
          activities[0].distance
        );
        console.log(activityCreated)
        
      } catch (error) {
        console.log(error);
      }
    
    }

  render() {
    const {activities} = this.state;
    return (
      <div>
        <NikeForm handleSubmit={this.handleSubmit} />
        <button><a href="http://www.strava.com/oauth/authorize?client_id=47805&response_type=code&redirect_uri=http://localhost:3000/converter/exchange_token&approval_prompt=force&scope=activity:write">authorize</a></button>
        <button onClick={this.handleConvert}>Convert</button>
        {activities && !!activities.length &&
        <Table activities={activities} />}
        
        
      </div>
    );
  }
}

export default Converter;
