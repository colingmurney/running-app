import React, { Component } from "react";
import { Link } from "react-router-dom";

class OtherOptions extends Component {
  state = {returnLink: "https://agile-savannah-82739.herokuapp.com/strava"};
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h2>STRAVA EXPORT</h2>
          <p>Export your Strava activities data by csv. </p>
          <p>
            <a
              className="btn btn-secondary"
              href={`http://www.strava.com/oauth/authorize?client_id=47805&response_type=code&redirect_uri=${this.state.returnLink}/exchange_token&approval_prompt=force&scope=activity:read_all`}
              role="button"
            >
              Strava data&raquo;
            </a>
          </p>
        </div>
        <div className="col-md-4">
          <h2>NIKE EXPORT</h2>
          <p>Export your NRC activities data by csv. </p>
          <p>
            <Link className="btn btn-secondary" to="/nike" role="button">
              Nike data &raquo;
            </Link>
          </p>
        </div>
        <div className="col-md-4">
          <h2>MANUAL ACTIVITY</h2>
          <p>Manually enter data about your activity to Strava.</p>
          <p>
            <Link className="btn btn-secondary" to="/manual" role="button">
              Create &raquo;
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default OtherOptions;
