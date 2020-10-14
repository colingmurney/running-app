import StravaTemplate from "./stravaTemplate";
import capitalizeFirstLetter from "./capitalizeFirstLetter"

function searchSummaries(summaries, metric) {
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
    let type = capitalizeFirstLetter(activity.type);
    let moving_time = Math.round(parseInt(activity.active_duration_ms) / 1000);
    let date = new Date(parseInt(activity.start_epoch_ms));
    let start_date_local =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();
    let description = `${activity.tags["com.nike.temperature"]} degrees. ${activity.tags["com.nike.weather"]}. Imported from Nike Run Club`;
    let distance = Math.round(searchSummaries(summaries, "distance") * 1000);
    let total_elevation_gain = Math.round(searchSummaries(summaries, "ascent") || 0);
    let average_heartrate = null;
    let isSelected = false;

    //create new instance of strava template
    let nikeObj = new StravaTemplate(
      id,
      name,
      type,
      moving_time,
      start_date_local,
      description,
      distance,
      total_elevation_gain,
      average_heartrate,
      isSelected
    );
    //append template to formatted nike array
    formattedNike.push(nikeObj);
  });
  return formattedNike;
}
export default formatNike;
