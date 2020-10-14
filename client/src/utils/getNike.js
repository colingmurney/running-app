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
      console.log(response.data)
      return response.data;
    })
    .catch((error) => console.log(error));
}

export default getNike;
