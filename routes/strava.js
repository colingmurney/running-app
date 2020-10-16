const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const jsonParser = bodyParser.json();
const formatStrava = require("../utils/formatStrava")
const getAccessToken = require("../utils/getAccessToken")

function getActivities(access_token) {
  const activitiesURL = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`;

  return fetch(activitiesURL)
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
}

router.post("/getActivities", jsonParser, async (req, res) => {
  try {
    const response = await getAccessToken(
        req.body.client_id,
        req.body.client_secret,
        req.body.refresh_token
      ) 
    const activities = await getActivities(response.access_token)
    const formattedActivities = formatStrava(activities)
    res.send(formattedActivities)
  }
  catch(error) {
    res.send(error)
  }
  
});

function createActivity(
  name,
  type,
  start_date_local,
  elapsed_time,
  description,
  distance,
  access_token
) {
  const data = {
    name: name,
    type: type,
    start_date_local: start_date_local,
    elapsed_time: elapsed_time,
    description: description,
    distance: distance,
    access_token: access_token,
  };

  return fetch("https://www.strava.com/api/v3/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
}

router.post("/createActivity", jsonParser, (req, res) => {
  getAccessToken(
    req.body.client_id,
    req.body.client_secret,
    req.body.refresh_token
  )
    .then((result) =>
      createActivity(
        req.body.name,
        req.body.type,
        req.body.start_date_local,
        req.body.elapsed_time,
        req.body.description,
        req.body.distance,
        result.access_token
      )
    )
    .then((activity) => res.send(activity));
});

module.exports = router;
