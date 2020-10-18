import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainOption extends Component {
  state = {};
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Running Data Converter</h1>
          <p>
            You can use this application to convert activities data from Nike+
            Run Club to your Strava account. There are also other features
            listed below including data export and manual creation.
          </p>
          <p>
            <Link
              className="btn btn-primary btn-lg"
              to="/converter"
              role="button"
            >
              Converter &raquo;
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default MainOption;
