import axios from "axios";

async function getNike(bearer) {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/nike/getActivities",
    data: {
      bearer: bearer,
    },
  })
    .then((response) => {
      return response.data.activities;
    })
    .catch((error) => console.log(error));
}

export default getNike;
