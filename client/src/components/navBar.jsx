import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavBar extends Component {
    state = {  }
    render() { 
        return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal"> {this.props.title}</h5>
          <h4 style={{color: "#FC4C02"}}className="my-0 mr-md-auto font-weight-normal">{this.props.step ? this.props.step : ""}</h4>
          <nav className="my-2 my-md-0 mr-md-3">
            <a className="p-2 text-dark" href="http://www.strava.com/oauth/authorize?client_id=47805&response_type=code&redirect_uri=http://localhost:3000/strava/exchange_token&approval_prompt=force&scope=activity:read_all">
              Strava
            </a>
            <Link className="p-2 text-dark" to="/nike">Nike</Link>
          </nav>
          <Link className="btn btn-outline-primary" to="/" role="button">Home</Link>
      </div>);
    }
}

export default NavBar;

