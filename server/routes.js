const express = require("express");
const strava = require("./routes/strava");
const nike = require("./routes/nike");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/strava", strava);
  app.use("/api/nike", nike);
};
