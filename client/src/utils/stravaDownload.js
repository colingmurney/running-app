import axios from "axios";

function stravaDownload(client_id, client_secret, refresh_token, selectedIndex) {
  return axios({
    method: "post",
    url: "/api/strava/download",
    data: {
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      selectedIndex: selectedIndex
    },
  }).then((response) => {
    return response.data;
  });
}

export default stravaDownload;