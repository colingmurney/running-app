const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const strava = require("strava-v3");
const jsonParser = bodyParser.json();

async function getActivities(access_token, client_id, client_secret) {
  try {
    const payload = await strava.athlete.listActivities({
      access_token: access_token,
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: "localhost",
    });
    return payload;
  } catch (error) {
    return error;
  }
}

router.post("/getActivities", jsonParser, (req, res) => {
  const data = {
    client_id: req.body.client_id,
    client_secret: req.body.client_secret,
    refresh_token: req.body.refresh_token,
    grant_type: "refresh_token",
  };

  fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) =>
      getActivities(
        data.access_token,
        req.body.client_id,
        req.body.client_secret
      )
    )
    .then((data) => res.send(data))
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
