const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const jsonParser = bodyParser.json();
const axios = require("axios");
const createGpx = require("gps-to-gpx").default;
const fs = require('fs');
const fsPromises = fs.promises;
const FormData = require("form-data");

function getActivitiesMetrics(token) {
    return axios({
      method: "get",
      url: "https://api.nike.com/sport/v3/me/activities/after_time/0?metrics=latitude,longitude", //metric objects are returned alphabetically
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      return response.data.activities;
    })
  }

  function uploadActivity(access_token, activity_type, name, description, filename) {
    console.log("upload function called")

    const data = new FormData();

    data.append('file', fs.createReadStream(`./gpx/${filename}`))

    return axios({
      method: "post",
      url: `https://www.strava.com/api/v3/uploads?activity_type=${activity_type}&name=${name}&description=${description}&data_type=gpx`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...data.getHeaders()
      },
      data: data
    //    {
    //       activity_type: activity_type,
    //       name: name,
    //       description: description,
    //       data_type: "gpx",
    //       file: fs.createReadStream(`./gpx/${filename}`)

    //   }
    }).then((response) => {
      return (response.data);
    }).catch(err => {return err})
  }

  
  router.post("/importActivities", jsonParser, async (req, res) => {
    try {
      activities = await getActivitiesMetrics(req.body.bearer);
      filteredActivities = [];
    
      for (let i of req.body.selectedIndex) {
          filteredActivities.push(activities[i])
      }

      const resultIds = [];
      for (let activity of filteredActivities) {
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
        fsPromises.appendFile(`./gpx/${filename}`, gpx);        
        } catch(e) {
        console.log(e)
        }
        console.log("created")
        
        const result = await uploadActivity(req.body.access_token, type, name, description, filename)
        console.log(result.id)
        resultIds.push(result.id)

        //send the result.id to the cllent

        try {
            fsPromises.unlink(`./gpx/${filename}`);  
        } catch(e) {
        console.log(e)
        }
      }
        //res.send(`${filteredActivities.length} runs added to Strava`)

        res.send(resultIds)
    }
    catch(error) {
      res.send(error)
    }
  });

  module.exports = router;