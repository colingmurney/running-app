async function downloadJSON(activities, filename) {

    const blob = new Blob(activities, {type: "application/json"})
    const url = URL.createObjectURL(blob)
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    return a;
}

export default downloadJSON;