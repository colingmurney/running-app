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
    selectedIndex: []
  }
    
    handleSubmit = async (token) => {
      const activities = await handleNikeForm(token)
      this.setState({activities})
    }

    handleConvert = async () => {
      
     //check if selectedIndex length is 0, is it is, return no runs selected

      //get param from url
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const authCode = params.get("code");

      const {client_id, client_secret, activities, selectedIndex} = this.state
      
      try {
        const refresh_token = await getRefreshToken(
          client_id,
          client_secret,
          authCode
        );
        
      for (let i of selectedIndex) {
            // console.log(activities[i].name)
            // console.log(activities[i].type)
            // console.log(activities[i].start_date_local)
            // console.log(activities[i].moving_time)
            // console.log(activities[i].description)
            // console.log(activities[i].distance)
        
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
          console.log(activityCreated)
          
          //unselect activities after conversion and empty selectedIndex
          //unselect part may go in loop since I need to reset the isSelected prop for everything in selectedIndex
          //const selectedIndex = []
        }
        
        
      } catch (error) {
        console.log(error);
      }
    
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
    const {activities, isSelected} = this.state;

    console.log(this.state.selectedIndex)
    return (
      <div>
        <NikeForm handleSubmit={this.handleSubmit} />
        <button><a href="http://www.strava.com/oauth/authorize?client_id=47805&response_type=code&redirect_uri=http://localhost:3000/converter/exchange_token&approval_prompt=force&scope=activity:write">authorize</a></button>
        <button onClick={this.handleConvert}>Convert</button>
        {activities && !!activities.length &&
        <Table activities={activities} handleSelect={this.handleSelect} isSelected={isSelected}/>}
      </div>
    );
  }
}

export default Converter;
