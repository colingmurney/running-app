const axios = require("axios")

function getAccessToken(client_id, client_secret, refresh_token) {
    
    return axios({
        method: "post",
        url: "https://www.strava.com/oauth/token",
        data: {
          client_id: client_id,
          client_secret: client_secret,
          refresh_token: refresh_token,
          grant_type: "refresh_token"
        },
      }).then((response) => {
        return response.data;
      });
  }

module.exports = getAccessToken;