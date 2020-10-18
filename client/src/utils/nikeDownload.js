import axios from "axios";

function nikeDownload(token, selectedIndex) {
  return axios({
    method: "post",
    url: "/api/nike/download",
    data: {
      bearer: token,
      selectedIndex: selectedIndex
    },
  }).then((response) => {
    return response.data;
  });
}

export default nikeDownload;