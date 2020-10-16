import axios from "axios"

function checkUploadStatus(uploadID, access_token) {
      
      return axios({
        method: 'get',
        url: `https://www.strava.com/api/v3/uploads/${uploadID}`,
        headers: { 
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(response => {
        return response.data.status;
      })

}

export default checkUploadStatus;