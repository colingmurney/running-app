const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const jsonParser = bodyParser.json();
const axios = require("axios");
const createGpx = require("gps-to-gpx").default;
const fs = require('fs');
const fsPromises = fs.promises;
const FormData = require("form-data");
const getNikeActivities = require("../utils/getNikeActivities")
const filterBadData = require("../utils/filterBadData")

function uploadActivity(access_token, activity_type, name, description, filename) {
  const data = new FormData();

  data.append('file', fs.createReadStream(`./${filename}`))

  return axios({
    method: "post",
    url: `https://www.strava.com/api/v3/uploads?activity_type=${activity_type}&name=${name}&description=${description}&data_type=gpx`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      ...data.getHeaders()
    },
    data: data
  
  }).then((response) => {
    return (response.data);
  }).catch(err => {return err})
}

  router.post("/importActivities", jsonParser, async (req, res) => {
    
    try {
      let after_time = 0
      let allActivities = [];
    
      do {
        let {activities, paging} = await getNikeActivities(req.body.bearer, true, after_time);
        for (let activity of activities) {
          if (filterBadData(activity)) {
          allActivities.push(activity)
          }
        }
        after_time = paging.after_time
      } while (after_time)

        let selectedActivities = [];
        for (let i of req.body.selectedIndex) {
            selectedActivities.push(allActivities[i])
        }

      const resultIds = [];
      for (let activity of selectedActivities) {
        let type = activity.type;
        let name = activity.tags["com.nike.name"];
        let description = `${activity.tags["com.nike.temperature"]} degrees. ${activity.tags["com.nike.weather"]}. Imported from Nike Run Club`;
        let filename = `${activity.id}.txt`

        let startTime = new Date(parseInt(activity.start_epoch_ms));
        startTime = startTime.toISOString();

        const {metrics} = activity
        const lengthLatLong = metrics[0].values.length
        const waypoints = [];

        for (let n=0; n<lengthLatLong; n++) {
            let time = new Date(parseInt(metrics[0].values[n].start_epoch_ms));
            time = time.toISOString();
            const lat = metrics[0].values[n].value;
            const lng = metrics[1].values[n].value;
            const waypoint = {
                "latitude": lat,
                "longitude": lng,
                "time": time
            };
            waypoints.push(waypoint);
        }

        const gpx = createGpx(waypoints)

        try {
          await fsPromises.appendFile(`./${filename}`, gpx);        
        } catch(e) {console.log(e)}
        
        const result = await uploadActivity(req.body.access_token, type, name, description, filename)
        resultIds.push(result.id)

        try {
            await fsPromises.unlink(`./${filename}`);  
        } catch(e) {console.log(e)}
      }

      res.send(resultIds)
    }
    catch(error) {
      res.send(error)
    }
  });

  module.exports = router;