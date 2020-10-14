import React, { Component } from "react";


class Table extends Component {
  state = {};

  onSelect = (e) => {
    const index = e.target.id
    this.props.handleSelect(index)
  }

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
            {/* <th scope="col">Heartrate</th> */}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="clickable" onClick={this.onSelect}>
          {this.props.activities.map((activity, index) => (
            <tr key={activity.external_id} >
              <td id={index}>{activity.external_id}</td>
              <td id={index}>{activity.name}</td>
              <td id={index}>{activity.type}</td>
              <td id={index}>{activity.start_date_local}</td>
              <td id={index}>{activity.distance}</td>
              <td id={index}>{activity.moving_time}</td>
              <td id={index}>{activity.total_elevation_gain}</td>
              {/* <td id={index}>{activity.average_heartrate}</td> */}
              <td id={index}><i className={activity.isSelected ? "fa fa-check" : ""} aria-hidden="true"></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
