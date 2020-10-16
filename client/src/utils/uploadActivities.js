import axios from "axios";

async function uploadActivity(selectedIndex, access_token, nike_bearer) {
    return axios({
        method: "post",
        url: "http://localhost:8000/api/converter/importActivities",
        data: {
          selectedIndex: selectedIndex,
          access_token: access_token,
          bearer: nike_bearer,
        },
      }).then((response) => {
        return response.data;
      });
}

export default uploadActivity;