function statusMessages(messages) {
    let countReady = 0;
    let countProcessing = 0;
    let countError = 0;

    for (let message of messages) {
        if (message === "Your activity is ready.") countReady++
        if (message === "Your activity is still being processed.") countProcessing++
        if (message === "There was an error processing your activity.") countError++
    }

    if (countReady) {alert(`${countReady} runs were successly uploaded to Strava`)}
    if (countProcessing) {alert(`${countReady} runs are is still being processed by Strava`)}
    if (countError) {alert(`${countReady} runs experienced an error during processing. The activities may already be uploaded to Strava.`)}
}

export default statusMessages;