import React, { Component } from "react";


class Table extends Component {
  state = {};

  onSelect = (e) => {
    const index = parseInt(e.target.id)
    this.props.handleSelect(index)
  }

  render() {
    const {activities, type} = this.props;
    return (
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Date</th>
            <th scope="col">Distance (KM)</th>
            <th scope="col">Time</th>
            <th scope="col">Elevation (Meters)</th>
            {type === "strava" && <th scope="col">Heartrate</th>}
            {type === "nike" && <th scope="col">Weather</th>}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="clickable" onClick={this.onSelect}>
          {activities.map((activity, index) => (
            <tr key={index} >
              <td id={index}>{activity.name}</td>
              <td id={index}>{activity.type}</td>
              <td id={index}>{activity.start_date_local}</td>
              <td id={index}>{activity.distance}</td>
              <td id={index}>{activity.moving_time}</td>
              <td id={index}>{activity.total_elevation_gain}</td>
              {type === "strava" && <td id={index}>{activity.average_heartrate}</td>}
              {type === "nike" && <td id={index}>{activity.weather}</td>}
              <td id={index}><i className={activity.isSelected ? "fa fa-check" : ""} aria-hidden="true"></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
