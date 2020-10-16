const express = require("express");
const strava = require("./routes/strava");
const nike = require("./routes/nike");
const converter = require("./routes/converter")
const cors = require("cors");

module.exports = function (app) {
  app.use(cors());

  app.use("/api/strava", strava);
  app.use("/api/nike", nike);
  app.use("/api/converter", converter);
};
