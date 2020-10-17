const StravaTemplate = require("./stravaTemplate")
const capitalizeFirstLetter = require("./capitalizeFirstLetter")

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

    //checks for bad data that will mess up http response
    // if (activity.active_duration_ms === 0) return
    // if (summaries.length === 0) return
    // if (activity.tags["com.nike.running.runtype"]) return //filter manual entries


    let id = activity.id;
    let name = activity.tags["com.nike.name"] || "Nike Run";
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

module.exports = formatNike;
