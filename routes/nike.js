const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const formatNike = require("../utils/formatNike")
const jsonParser = bodyParser.json();


const axios = require("axios")

function getActivities(token) {
  return axios({
    method: "get",
    url: "https://api.nike.com/sport/v3/me/activities/after_time/0",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.data.activities;
  })
}

router.post("/getActivities", jsonParser, async (req, res) => {
  try {
    const activities = await getActivities(req.body.bearer);
    const formattedNike = formatNike(activities);
    res.send(formattedNike)
  }
  catch(error) {
    res.send(error)
  }

});

module.exports = router;
