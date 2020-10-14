import React, { Component } from "react";
import NikeForm from "./nikeForm";
import getNike from "../utils/getNike"
import createActivity from "../utils/createActivity"
import getRefreshToken from "../utils/getRefreshToken"
import Table from "./table";
import NavBar from "./navBar";

class Converter extends Component {
  state = {
    client_id: "47805",
    client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
    refresh_token: sessionStorage.getItem("refresh_token") || "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
    selectedIndex: [],
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

          sessionStorage.setItem("refresh_token", refresh_token)
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
      this.setState({activities})
    }

    handleConvert = async () => {
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
          delete activities[i]
          console.log(activityCreated)
          
        }
        //filter out runs just converted and reset selectedIndex
        activities = activities.filter(function (el) {
          return el != null;
        });
        selectedIndex = []

        this.setState({activities, selectedIndex})
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
