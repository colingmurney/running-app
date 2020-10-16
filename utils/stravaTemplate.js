//probably dont even need this, can just make new object every time in formatNike.js

class StravaTemplate {
  constructor(
    external_id,
    name,
    type,
    moving_time,
    start_date_local,
    description,
    distance,
    total_elevation_gain,
    average_heartrate,
    isSelected
  ) {
    this.external_id = external_id;
    this.name = name;
    this.type = type;
    this.moving_time = moving_time;
    this.start_date_local = start_date_local;
    this.description = description;
    this.distance = distance;
    this.total_elevation_gain = total_elevation_gain;
    this.average_heartrate = average_heartrate;
    this.isSelected = isSelected;
  }
}

module.exports = StravaTemplate
