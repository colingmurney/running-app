const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const jsonParser = bodyParser.json();
const request = require("request");

router.post("/getActivities", jsonParser, (req, res) => {
  //Bearer will expire. Instuctions to manually retreive new one: https://yasoob.me/posts/nike-run-club-data-visualization/
  var options = {
    method: "GET",
    url: "https://api.nike.com/sport/v3/me/activities/after_time/0",
    headers: {
      Authorization: `Bearer ${req.body.bearer}`,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
});

module.exports = router;
