function downloadJSON(activities, selectedIndex, filename) {
    let activitiesJSON = []
    for (let i of selectedIndex) {
        const activity = JSON.stringify(activities[i])
        activitiesJSON.push(activity)
    }
    console.log(activitiesJSON)

    const blob = new Blob(activitiesJSON, {type: "application/json"})
    const url = URL.createObjectURL(blob)
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    return a;
    

}

export default downloadJSON;