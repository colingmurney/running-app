const capitalizeFirstLetter = require("./capitalizeFirstLetter")

function searchSummaries(summaries, metric) {
  for (const summary of summaries) {
    if (summary.metric === metric) return summary.value;
  }
}

function msToHMS( ms ) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = Math.round(seconds % 60);

  if (seconds < 10) seconds = `0${seconds}`
  if (minutes < 10) minutes = `0${minutes}`

  
  if (hours === 0) return `${minutes}:${seconds}`
  return `${hours}:${minutes}:${seconds}`
} 



function formatNike(nikeActivities) {
  const formattedNike = [];
  
  nikeActivities.forEach((activity) => {
    let summaries = activity.summaries;

    let name = activity.tags["com.nike.name"] || "Nike Run";
    let type = capitalizeFirstLetter(activity.type);
    let moving_time = msToHMS(activity.active_duration_ms);
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
      isSelected
    }
    
    //append template to formatted nike array
    formattedNike.push(nikeObj);
  });
  
  return formattedNike;
}

module.exports = formatNike;
