//want to expand this constructor to include every Strava property

class StravaTemplate {
  constructor(
    external_id,
    name,
    type,
    moving_time,
    start_date_local,
    description,
    distance,
    trainer,
    commute,
    total_elevation_gain,
    average_heartrate
  ) {
    this.external_id = external_id;
    this.name = name;
    this.type = type;
    this.moving_time = moving_time;
    this.start_date_local = start_date_local;
    this.description = description;
    this.distance = distance;
    this.trainer = trainer;
    this.commute = commute;
    this.total_elevation_gain = total_elevation_gain;
    this.average_heartrate = average_heartrate;
  }
}
export default StravaTemplate;
