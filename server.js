const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

require("./routes")(app);

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
