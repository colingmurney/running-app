import React, { Component } from "react";

class Table extends Component {
  state = {};

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Activity ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Local Start</th>
            <th scope="col">Distance</th>
            <th scope="col">Time</th>
            <th scope="col">Elevation</th>
            <th scope="col">Heartrate</th>
          </tr>
        </thead>
        <tbody>
          {this.props.activities.map((activity) => (
            <tr key={activity.external_id}>
              <td>{activity.external_id}</td>
              <td>{activity.name}</td>
              <td>{activity.type}</td>
              <td>{activity.start_date_local}</td>
              <td>{activity.distance}</td>
              <td>{activity.moving_time}</td>
              <td>{activity.total_elevation_gain}</td>
              <td>{activity.average_heartrate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
