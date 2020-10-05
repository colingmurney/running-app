const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const strava = require("strava-v3");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

require("./routes")(app);
// const jsonParser = bodyParser.json();

// app.post("/nike", jsonParser, (req, res) => {
//   //Bearer will expire. Instuctions to manually retreive new one: https://yasoob.me/posts/nike-run-club-data-visualization/
//   var options = {
//     method: "GET",
//     url: "https://api.nike.com/sport/v3/me/activities/after_time/0",
//     headers: {
//       Authorization: `Bearer ${req.body.bearer}`,
//       //Cookie:
//       //"bm_sz=CF8D9A12AFDDF1CF8B4349393374751F~YAAQj0q/zLZ6fZ90AQAAbTE69glhCgXiQyeEj8M5419vysuxn+5REAl6HppAc/0btaDTRsQsgW8jbzVHIzLOZgMMazOopWHlhWLJ5H/AD3piLESL9Uph4SkUoeu9yyLpliB8hVOlYCBdZg17/vktCSwI5NkyulJLmugXKMDcSMr87EFfmpxjly0WVz++dA==; _abck=517CD62D4EBFF483BCB3F4C807F85AF4~-1~YAAQj0q/zLd6fZ90AQAAbTE69gST4YIW9oypeajmbz3EJfCRe6NIqmhcpgmDcYu/DAGmM0b7cg1Do4dKnd2YXmjwD4+os7mkGX0PTExim1ZSDjuCVTR5IyNouWhOckRS0HWOYaZsZ1aMYSLGWn/3jYsXB1AWZ9XpCtvxuYlkIeCR45V207MhXrWw5oOItGe890NZFII6ZJ9mdABymM6tFjRIRfPnDttxqxqlbJGper6TA2DpKJEs8nRscUGB0GTllxzEThe5rKwcsAwpnJ0zqYg2mXnKpF8kRsFV52jPdED42oRvNV+spw==~-1~-1~-1",
//     },
//   };
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     res.send(response.body);
//   });
// });

// async function getActivities(access_token, client_id, client_secret) {
//   try {
//     const payload = await strava.athlete.listActivities({
//       access_token: access_token,
//       client_id: client_id,
//       client_secret: client_secret,
//       redirect_uri: "localhost",
//     });
//     return payload;
//   } catch (error) {
//     return error;
//   }
// }

// app.post("/activities", jsonParser, (req, res) => {
//   // const data = {
//   //   client_id: "47805",
//   //   client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
//   //   refresh_token: "81bc07a93014fc6642e1fdbe2abe8d545654f978",
//   //   grant_type: "refresh_token",
//   // };

//   const data = {
//     client_id: req.body.client_id,
//     client_secret: req.body.client_secret,
//     refresh_token: req.body.refresh_token,
//     grant_type: "refresh_token",
//   };

//   fetch("https://www.strava.com/oauth/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) =>
//       getActivities(
//         data.access_token,
//         req.body.client_id,
//         req.body.client_secret
//       )
//     )
//     .then((data) => res.send(data))
//     .catch((error) => {
//       res.send(error);
//     });
// });

// app.get("/refresh", (req, res) => {
//   // const data = {
//   //   client_id: "47805",
//   //   client_secret: "aeb849953d794088bb82fbce08b6e12588fa7725",
//   //   refresh_token: "81bc07a93014fc6642e1fdbe2abe8d545654f978",
//   //   grant_type: "refresh_token",
//   // };

//   const data = {
//     client_id: req.client_id,
//     client_secret: req.client_secret,
//     refresh_token: req.refresh_token,
//     grant_type: "refresh_token",
//   };

//   fetch("https://www.strava.com/oauth/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => res.send(data))
//     .catch((error) => {
//       res.send(error);
//     });
// });

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
