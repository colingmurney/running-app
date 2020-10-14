function formatStrava(stravaActivities) {  
    for (let i of stravaActivities) {
        i["isSelected"] = false;
    }
    return stravaActivities
}

module.exports = formatStrava;