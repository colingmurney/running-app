const capitalizeFirstLetter = require("./capitalizeFirstLetter")
const durationToHMS = require("./durationToHMS")


function searchSummaries(summaries, metric) {
  //find matching metric object in array of metric objects
  for (const summary of summaries) {
    if (summary.metric === metric) return summary.value;
  }
}

function formatNike(nikeActivities) {
  const formattedNike = [];
  
  nikeActivities.forEach((activity) => {
    let summaries = activity.summaries;

    let name = activity.tags["com.nike.name"] || "Nike Run";
    let type = capitalizeFirstLetter(activity.type);
    let moving_time = durationToHMS(activity.active_duration_ms, true);
    let date = new Date(parseInt(activity.start_epoch_ms));
    let start_date_local =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getUTCDate();
    let weather = `${activity.tags["com.nike.temperature"]} Celcius and ${activity.tags["com.nike.weather"]}.`
    let distance = (searchSummaries(summaries, "distance").toFixed(2));
    let total_elevation_gain = Math.round(searchSummaries(summaries, "ascent") || 0);
    let isSelected = false;

    let nikeObj = {
      name: name,
      type: type,
      moving_time: moving_time,
      start_date_local: start_date_local,
      weather: weather,
      distance: distance,
      total_elevation_gain: total_elevation_gain,
      isSelected: isSelected
    }
    
    //append template to formatted nike array
    formattedNike.push(nikeObj);
  });
  
  return formattedNike;
}

module.exports = formatNike;
