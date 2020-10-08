import axios from "axios";

function getNike(bearer) {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/nike/getActivities",
    data: {
      bearer: bearer,
    },
  }).then((response) => {
    console.log(response);
    return response.data;
  });
}

export default getNike;
