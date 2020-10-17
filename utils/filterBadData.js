function filterBadData(activity) {
    if (activity.active_duration_ms === 0) return false
    if (activity.summaries.length === 0) return false
    if (activity.tags["com.nike.running.runtype"]) return false //filter manual entries

    return true;
}

module.exports = filterBadData;