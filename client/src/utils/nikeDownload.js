import axios from "axios";

function nikeDownload(token, selectedIndex) {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/nike/download",
    data: {
      bearer: token,
      selectedIndex: selectedIndex
    },
  }).then((response) => {
    return response.data;
  });
}

export default nikeDownload;