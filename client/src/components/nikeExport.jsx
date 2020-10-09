import React, { Component } from "react";
import getNike from "../utils/getNike";
import formatNike from "../utils/formatNike";
import Table from "./table";

class NikeExport extends Component {
  state = {
    token: "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = this.token.value.trim();

    try {
      let activities = await getNike(token);
      console.log(activities); //will be undefined if token is incorrect
      //reformat data before setting the state
      activities = formatNike(activities);
      sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
      this.setState({ activities });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Token</label>
            <input
              className="form-control"
              placeholder="Bearer Token"
              type="text"
              name="token"
              ref={(input) => (this.token = input)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Get activities
          </button>
        </form>
        <p>
          <a href="https://yasoob.me/posts/nike-run-club-data-visualization/">
            Instructions for retreiving token
          </a>
        </p>
        <Table activities={this.state.activities} />
      </div>
    );
  }
}

export default NikeExport;
