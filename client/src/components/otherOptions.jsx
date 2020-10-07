import React, { Component } from "react";
import { Link } from "react-router-dom";

class OtherOptions extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h2>STRAVA EXPORT</h2>
          <p>Export your Strava activities data by csv. </p>
          <p>
            <Link className="btn btn-secondary" to="/strava" role="button">
              Strava data&raquo;
            </Link>
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
