import axios from "axios";

async function getNike(bearer) {
  return axios({
    method: "post",
    url: "/api/nike/getActivities",
    data: {
      bearer: bearer,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
}

export default getNike;
