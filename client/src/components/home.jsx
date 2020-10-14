import React, { Component } from "react";
import MainOption from "./mainOption";
import OtherOptions from "./otherOptions";
import NavBar from "./navBar"

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar title="Home"/>
        <div className="container">
        <MainOption />
        <OtherOptions />
        </div>
      </div>
    );
  }
}

export default Home;
