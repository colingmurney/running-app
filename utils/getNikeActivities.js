const axios = require("axios")

function getNikeActivities(token, withMetrics, after_time) {

    let metrics = ""
    if (withMetrics) {
        metrics = metrics + "?metrics=latitude,longitude"
    }

       return axios({
      method: "get",
      url: "https://api.nike.com/sport/v3/me/activities/after_time/" + after_time + metrics,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
        return response.data;
    })
  }

  module.exports = getNikeActivities;