import React, { Component } from "react";
import getNike from "../utils/getNike";

class NikeExport extends Component {
  state = {
    token: "",
    activities: JSON.parse(sessionStorage.getItem("nikeActivities")) || [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = this.token.value.trim();

    try {
      const activities = await getNike(token);
      console.log(activities);
      sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
      this.setState({ activities, token });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.token);
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
        <p>The token is {this.state.token}</p>
      </div>
    );
  }
}

export default NikeExport;
