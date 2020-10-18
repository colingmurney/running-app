const durationToHMS = require("./durationToHMS")

function formatStrava(stravaActivities) {  
    const formattedStava = []

    stravaActivities.forEach(activity => {
        let name = activity.name;
        let type = activity.type;
        let start_date_local = activity.start_date_local.substring(0,10);
        let distance = (activity.distance / 1000).toFixed(2);
        let moving_time = durationToHMS(activity.moving_time, false) 
        let total_elevation_gain = activity.total_elevation_gain;
        let average_heartrate = activity.average_heartrate;
        let isSelected = false;

        let stravaObj = {
            name: name,
            type: type,
            start_date_local: start_date_local,
            distance: distance,
            moving_time: moving_time,
            total_elevation_gain: total_elevation_gain,
            average_heartrate: average_heartrate,
            isSelected: isSelected
        }
        formattedStava.push(stravaObj);
    })
    return formattedStava;
}

module.exports = formatStrava;