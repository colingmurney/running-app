const bodyParser = require("body-parser");
const express = require("express");
const filterBadData = require("../utils/filterBadData");
const router = express.Router();
const formatNike = require("../utils/formatNike")
const getNikeActivities = require("../utils/getNikeActivities")
const jsonParser = bodyParser.json();

router.post("/getActivities", jsonParser, async (req, res) => {
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

    const formattedNike = formatNike(allActivities);
    res.send(formattedNike)
  }
  catch(error) {res.send(error)}
});

router.post("/download", jsonParser, async (req, res) => {
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
    
    let activitiesJSON = []
    for (let i of req.body.selectedIndex) {
        const activity = JSON.stringify(allActivities[i])
        activitiesJSON.push(activity)
    }

    res.send(JSON.stringify(activitiesJSON))
  } catch (error) {
    res.send(error)
  }
})

module.exports = router;
