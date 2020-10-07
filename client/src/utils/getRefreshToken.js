import axios from "axios";

function getRefreshToken(client_id, client_secret, authCode) {
  return axios({
    method: "post",
    url: "https://www.strava.com/oauth/token",
    data: {
      client_id: client_id,
      client_secret: client_secret,
      code: authCode,
      grant_type: "authorization_code",
    },
  }).then((response) => {
    return response.data.refresh_token;
  });
}

export default getRefreshToken;
