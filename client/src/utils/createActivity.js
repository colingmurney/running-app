import axios from "axios";

//use for manual entry

async function createActivity(client_id, client_secret, refresh_token, name, type, start_date_local, moving_time, description, distance) {
    return axios({
        method: "post",
        url: "http://localhost:8000/api/strava/createActivity",
        data: {
          client_id: client_id,
          client_secret: client_secret,
          refresh_token: refresh_token,
          name: name,
          type: type,
          start_date_local: start_date_local,
          elapsed_time: moving_time,
          moving_time: moving_time,
          description: description,
          distance: distance,
        },
      }).then((response) => {
        return response.data;
      });
}

export default createActivity;