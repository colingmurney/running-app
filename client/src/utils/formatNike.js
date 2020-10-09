import StravaTemplate from "./stravaTemplate";

function searchSummaries(summaries, metric) {
  //   summaries.forEach((summary) => {
  //     if (summary["metric"] === metric) return summary["value"];
  //   });
  for (const summary of summaries) {
    if (summary.metric === metric) return summary.value;
  }
}

function formatNike(nikeActivities) {
  const formattedNike = [];

  nikeActivities.forEach((activity) => {
    //get summaries array for later use
    let summaries = activity.summaries;

    let id = activity.id;
    let name = activity.tags["com.nike.name"];
    let type = activity.type;
    let moving_time = parseInt(activity.active_duration_ms) / 1000;
    let date = new Date(parseInt(activity.start_epoch_ms));
    let start_date_local =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();
    let description = null;
    let distance = searchSummaries(summaries, "distance");
    let trainer = 0;
    let commute = 0;
    let total_elevation_gain = searchSummaries(summaries, "ascent");
    let average_heartrate = null;

    //create new instance of strava template
    let nikeObj = new StravaTemplate(
      id,
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
    );
    //append template to formatted nike array
    formattedNike.push(nikeObj);
  });
  return formattedNike;
}
export default formatNike;
