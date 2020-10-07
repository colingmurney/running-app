import React, { Component } from "react";
import MainOption from "./mainOption";
import OtherOptions from "./otherOptions";

class Home extends Component {
  state = {};
  render() {
    return (
      <main role="main">
        <MainOption />
        <OtherOptions />
      </main>
    );
  }
}

export default Home;
