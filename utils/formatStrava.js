//Add isSelected field to Strava activities
function formatStrava(stravaActivities) {  
    for (let activity of stravaActivities) {
        activity["isSelected"] = false;
    }
    return stravaActivities
}

module.exports = formatStrava;