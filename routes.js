const express = require("express");
const strava = require("./routes/strava");
const nike = require("./routes/nike");
const test = require("./routes/test");
const cors = require("cors");

module.exports = function (app) {
  //app.use(express.json());

  app.use(cors());

  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   // res.header(
  //   //   "Access-Control-Allow-Headers",
  //   //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  //   // );
  //   // if (req.method === "OPTIONS") {
  //   //   res.header(
  //   //     "Access-Control-Allow-Methods",
  //   //     "PUT, POST, PATCH, DELETE, GET"
  //   //   );
  //   //   return res.status(200).json({});
  //   // }
  //   next();
  // });

  app.use("/api/strava", strava);
  app.use("/api/nike", nike);
  app.use("/api/test", test);
};
