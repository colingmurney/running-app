import getNike from "../utils/getNike";
import formatNike from "../utils/formatNike";

async function handleNikeForm(token) {
    try {
        let activities = await getNike(token);
        
        //reformat data before setting the state
        activities = formatNike(activities);
        sessionStorage.setItem("nikeActivities", JSON.stringify(activities));
        //this.setState({ activities });
        console.log(activities)
        return activities
      } catch (err) {
        console.log(err);
      }
}

export default handleNikeForm