import axios from "axios";

function getActivities(client_id, client_secret, refresh_token) {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/strava/getActivities",
    data: {
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
    },
  }).then((response) => {
    return response.data;
  });
}

export default getActivities;
